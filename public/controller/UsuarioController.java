package com.example.maeriklavanderia.controller;

import com.example.maeriklavanderia.models.LoginRequest;
import com.example.maeriklavanderia.models.Usuario;
import com.example.maeriklavanderia.repository.UsuarioDao;
import com.example.maeriklavanderia.service.BackupMssqlFirebase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class UsuarioController {

    @Autowired
    private BackupMssqlFirebase backupMssqlFirebase;

    @Autowired
    private UsuarioDao usuarioDao;

    @GetMapping("/c")
    public String c() {
        return "Felicidades conecto al router";
    }

    @GetMapping(value = "GeneraToken")
    public String GeneraToken() {
        return "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
                "<SOAP-ENV:Header/>\n" +
                "<SOAP-ENV:Body>\n" +
                "<ns3:loginResponse xmlns:ns3=\"http://proxy.standard.services.sesame.bappa.com\">\n" +
                "<loginReturn>9456d1c72b86667ac8150256d936dea7d4051a9988</loginReturn>\n" +
                "</ns3:loginResponse>\n" +
                "</SOAP-ENV:Body>\n" +
                "</SOAP-ENV:Envelope>";
    }

    @PostMapping("procesar-json")
    public void procesarJson(@RequestBody Map<String, Object> jsonData) {
        System.out.println("Valor del JSON= " + jsonData);
    }

    @GetMapping(value = "Proceso")
    public String Proceso() {
        String tru = "{\n" +
                "\n" +
                "    \"warningMessages\": [],\n" +
                "\n" +
                "    \"exceptions\": [],\n" +
                "\n" +
                "    \"succeed\": true,\n" +
                "\n" +
                "    \"migratedProduct\": false,\n" +
                "\n" +
                "    \"policyNumber\": \"05.0201084545004246\",\n" +
                "\n" +
                "    \"policyId\": 153788496645,\n" +
                "\n" +
                "    \"operationPk\": 209100459448,\n" +
                "\n" +
                "    \"premiumValue\": 708.000000000000000000000000000000000000000000000000\n" +
                "\n" +
                "}";
        String fals = "{\n" +
                "    \"warningMessages\": [],\n" +
                "    \"exceptions\": [\n" +
                "        {\n" +
                "            \"errorCode\": [\n" +
                "                \"PIMS_ERROR_CODE\",\n" +
                "                \"POLICY_EXISTS\"\n" +
                "            ],\n" +
                "            \"unExpectedError\": true\n" +
                "        }\n" +
                "    ],\n" +
                "    \"succeed\": false,\n" +
                "    \"migratedProduct\": false,\n" +
                "    \"policyId\": 0\n" +
                "}";
        return fals;
    }

    @GetMapping(value = "poli")
    public String poli() {
        String tru = "{\n" +
                "\n" +
                "    \"warningMessages\": [],\n" +
                "\n" +
                "    \"exceptions\": [],\n" +
                "\n" +
                "    \"succeed\": true,\n" +
                "\n" +
                "    \"migratedProduct\": false,\n" +
                "\n" +
                "    \"policyNumber\": \"05.0201084545004245\",\n" +
                "\n" +
                "    \"policyId\": 153788496645,\n" +
                "\n" +
                "    \"operationPk\": 209100459448,\n" +
                "\n" +
                "    \"premiumValue\": 708.000000000000000000000000000000000000000000000000\n" +
                "\n" +
                "}";
        return tru;
    }

    @GetMapping(value = "json")
    public Usuario json() {
        Usuario usuario = new Usuario();
        usuario.setRfid("001");
        usuario.setNombre("Dani");
        usuario.setCorreo("Fuentes");
        usuario.setContrasena("mil@gmail.com");
        usuario.setTelefono("72727262");
        usuario.setSaldo(1234);
        usuario.setFecha("15/09/1997");
        return usuario;
    }

    @GetMapping(value = "usuario/{id}")
    public Usuario getusuario(@PathVariable Long id) {
        Usuario usuario = new Usuario();
        usuario.setId("id");
        usuario.setRfid("Dani");
        usuario.setNombre("Dani");
        usuario.setCorreo("Fuentes");
        usuario.setContrasena("mil@gmail.com");
        usuario.setTelefono("72727262");
        usuario.setSaldo(1234);
        usuario.setFecha("15/09/1997");
        return usuario;
    }

    @GetMapping(value = "listausuario")
    public List<Usuario> getListusuario() {

        List<Usuario> listausuarios = new ArrayList<>();

        Usuario usuario = new Usuario();
        usuario.setId("1L");
        usuario.setRfid("Dani");
        usuario.setNombre("Dani");
        usuario.setCorreo("Fuentes");
        usuario.setContrasena("mil@gmail.com");
        usuario.setTelefono("72727262");
        usuario.setSaldo(1234);
        usuario.setFecha("15/09/1997");

        Usuario usuario2 = new Usuario();
        usuario2.setId("2L");
        usuario2.setRfid("Dani");
        usuario2.setNombre("Dani");
        usuario2.setCorreo("Fuentes");
        usuario2.setContrasena("mil@gmail.com");
        usuario2.setTelefono("72727262");
        usuario2.setSaldo(1234);
        usuario2.setFecha("15/09/1997");

        Usuario usuario3 = new Usuario();
        usuario3.setId("3L");
        usuario3.setRfid("Dani");
        usuario3.setNombre("Dani");
        usuario3.setCorreo("Fuentes");
        usuario3.setContrasena("mil@gmail.com");
        usuario3.setTelefono("72727262");
        usuario3.setSaldo(1234);
        usuario3.setFecha("15/09/1997");

        Usuario usuario4 = new Usuario();
        usuario4.setId("4L");
        usuario4.setRfid("Dani");
        usuario4.setNombre("Dani");
        usuario4.setCorreo("Fuentes");
        usuario4.setContrasena("mil@gmail.com");
        usuario4.setTelefono("72727262");
        usuario4.setSaldo(1234);
        usuario4.setFecha("15/09/1997");

        listausuarios.add(usuario);
        listausuarios.add(usuario2);
        listausuarios.add(usuario3);
        listausuarios.add(usuario4);
        return listausuarios;
    }

    @GetMapping(value = "api/usuario")
    public List<Usuario> getUsuarios() {
        return usuarioDao.getUsuarios();
    }

    @GetMapping(value = "/tablausuarios")
    public List<Usuario> getTablaUsuarios() {
        return backupMssqlFirebase.obtenerTodosLosUsuarios();
    }
    @GetMapping(value = "/usuariofireb/{rfid}")
    public Usuario obtenerUsuarioPorRfid(@PathVariable("rfid") String rfid) {

        System.out.println("rif pa actualiar .---------------"+rfid);
        Usuario usuario = backupMssqlFirebase.obtenerUsuarioPorRfid(rfid);
        System.out.println("rif pa actualiar .---------------"+usuario);
        if (usuario != null) {
            return usuario;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con RFID: " + rfid);
        }
    }

    @PatchMapping(value = "/actualizarfire/{rfid}")
    public String actualizarUsuario(@PathVariable("rfid") String rfid, @RequestBody Usuario usuario) {
        try {
            backupMssqlFirebase.actualizarUsuario(rfid, usuario);
            return "Usuario con RFID " + rfid + " actualizado con éxito.";
        } catch (Exception e) {
            return "Error al actualizar el usuario: " + e.getMessage();
        }
    }

    @DeleteMapping(value = "/eliminar/{rfid}")
    public String eliminarUsuario(@PathVariable("rfid") String rfid) {
        try {
            backupMssqlFirebase.eliminarUsuario(rfid);
            return "Usuario con RFID " + rfid + " eliminado con éxito.";
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error al eliminar el usuario: " + e.getMessage());
        }
    }

    @PostMapping(value = "api/usuario")
    public void registrarUsuarios(@RequestBody Usuario usuario) {
        usuarioDao.registrar(usuario);
    }

    @PostMapping(value = "api/usuariofirebase")
    public ResponseEntity<String> registrarFirebase(@RequestBody Usuario usuario) {
        try {
            backupMssqlFirebase.registrar(usuario); // Llama al método registrar
            return ResponseEntity.ok("Usuario registrado en Firestore exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar usuario en Firestore: " + e.getMessage());
        }
    }

    @PostMapping("/loginfire")
    public ResponseEntity<?> checkLoginFire(@RequestBody LoginRequest loginRequest) {
        String correo = loginRequest.getEmail();
        String pass = loginRequest.getPassword();
        Usuario usuario = backupMssqlFirebase.validarLogin(correo, pass);

        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado o credenciales incorrectas");
        }
        return ResponseEntity.ok(usuario);
    }

    @GetMapping(value = "/backup")
    public String backupData() {
        try {
            backupMssqlFirebase.backupDataToFirestore();
            return "Backup completed successfully";
        } catch (Exception e) {
            return "Backup failed: " + e.getMessage();
        }
    }

    @GetMapping(value = "api/usuario/{id}")
    public Usuario getUsuario(@PathVariable("id") long id) {
        return usuarioDao.obtenerPorId(id);
    }

    @GetMapping("/check_uid/{rfid}")
    public String checkUid(@PathVariable String rfid) {
        Usuario usuario = usuarioDao.obtenerPorRfId(rfid);

        if (usuario != null && usuario.getSaldo() >= 10) {
            return "{\"status\": \"registered\"}";
        } else {
            return "{\"status\": \"not registered\"}";
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> checkLogin(@RequestBody LoginRequest loginRequest) {
        String correo = loginRequest.getEmail();
        String pass = loginRequest.getPassword();
        Usuario usuario = usuarioDao.validarLogin(correo, pass);

        if (usuario == null) {
            return ResponseEntity.status(404).body("Usuario no encontrado");
        }
        return ResponseEntity.ok(usuario);
    }



    @PatchMapping(value = "api/usuario/{id}")
    public void actualizarUsuario(@PathVariable("id") long id, @RequestBody Usuario usuario) {
        usuarioDao.actualizar(id, usuario);
    }

    @DeleteMapping(value = "api/usuario/{id}")
    public void deleteUsuario(@PathVariable("id") Long id) {
        usuarioDao.deleteUsuario(id);
    }
}
