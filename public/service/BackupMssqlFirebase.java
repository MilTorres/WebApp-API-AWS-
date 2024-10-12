package com.example.maeriklavanderia.service;

import com.example.maeriklavanderia.models.Usuario;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class BackupMssqlFirebase {

    private static final String JDBC_URL = "jdbc:sqlserver://localhost:1433;databaseName=bd_maerik";
    private static final String JDBC_USER = "sa";
    private static final String JDBC_PASSWORD = "1234";
    private static Firestore db;

    static {
        try {
            FileInputStream serviceAccount = new FileInputStream("C:/Users/Mil/Desktop/Maerik/serviceAccountKey.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
            db = FirestoreClient.getFirestore();
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void backupDataToFirestore() {
        String sql = "SELECT * FROM usuarios_local";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                String rfid = rs.getString("rfid");
                String nombre = rs.getString("nombre");
                DocumentReference docRef = db.collection("usuarios").document(rfid);
                Map<String, Object> docData = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    docData.put(metaData.getColumnName(i), rs.getString(i));
                }
                ApiFuture<WriteResult> result = docRef.set(docData);
                System.out.println("RFID= " + rfid + " Nombre= " + nombre + " Update time: " + result.get().getUpdateTime());
            }
        } catch (SQLException | InterruptedException | ExecutionException e) {
            System.out.println("ERROR");
            e.printStackTrace();
        }
    }

    public void registrar(Usuario usuario) {
        String userId = usuario.getRfid();

        DocumentReference userRef = db.collection("usuarios").document(userId);
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", usuario.getId());
        userData.put("rfid", usuario.getRfid());
        userData.put("nombre", usuario.getNombre());
        userData.put("correo", usuario.getCorreo());
        userData.put("contrasena", usuario.getContrasena());
        userData.put("telefono", usuario.getTelefono());
        userData.put("saldo", usuario.getSaldo());
        userData.put("fecha", usuario.getFecha());

        ApiFuture<WriteResult> future = userRef.set(userData);
        future.addListener(() -> {
            try {
                WriteResult result = future.get();
                System.out.println("Usuario registrado con éxito: " + result.getUpdateTime());
            } catch (Exception e) {
                System.err.println("Error al registrar el usuario: " + e.getMessage());
            }
        }, Runnable::run);
    }

    public Usuario obtenerUsuarioPorRfid(String rfid) {
        DocumentReference docRef = db.collection("usuarios").document(rfid);
        try {
            ApiFuture<com.google.cloud.firestore.DocumentSnapshot> future = docRef.get();
            com.google.cloud.firestore.DocumentSnapshot document = future.get();
            if (document.exists()) {
                Usuario usuario = document.toObject(Usuario.class);
                return usuario;
            } else {
                System.out.println("No se encontró un usuario con RFID: " + rfid);
            }
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error al obtener el usuario: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    public List<Usuario> obtenerTodosLosUsuarios() {
        List<Usuario> listaUsuarios = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection("usuarios").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            for (QueryDocumentSnapshot document : documents) {
                Usuario usuario = document.toObject(Usuario.class);
                // Asegúrate de asignar el ID del documento a la propiedad `rfid`
                usuario.setRfid(document.getId());
                listaUsuarios.add(usuario);
            }
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error al obtener los usuarios: " + e.getMessage());
            e.printStackTrace();
        }
        return listaUsuarios;
    }

    public void eliminarUsuario(String rfid) {
        DocumentReference docRef = db.collection("usuarios").document(rfid);
        ApiFuture<WriteResult> writeResult = docRef.delete();
        try {
            System.out.println("Usuario con RFID: " + rfid + " eliminado. Time: " + writeResult.get().getUpdateTime());
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error al eliminar el usuario: " + e.getMessage());
            e.printStackTrace();
        }
    }
    public void actualizarUsuario(String rfid, Usuario usuario) {
        DocumentReference userRef = db.collection("usuarios").document(rfid);
        ApiFuture<WriteResult> future = userRef.set(usuario); // Utiliza 'set' para crear o actualizar
        future.addListener(() -> {
            try {
                WriteResult result = future.get();
                System.out.println("Usuario con RFID " + rfid + " actualizado con éxito: " + result.getUpdateTime());
            } catch (Exception e) {
                System.err.println("Error al actualizar el usuario: " + e.getMessage());
            }
        }, Runnable::run);
    }

    public Usuario validarLogin(String correo, String contrasena) {
        try {
            // Consultar Firestore buscando por correo
            ApiFuture<QuerySnapshot> future = db.collection("usuarios")
                    .whereEqualTo("correo", correo)
                    .whereEqualTo("contrasena", contrasena)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                // Si se encontró un usuario que coincide con el correo y contraseña
                return documents.get(0).toObject(Usuario.class);
            } else {
                // Si no se encontró un usuario con ese correo y contraseña
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            System.err.println("Error al validar el login: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }


}
