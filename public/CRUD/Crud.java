package com.example.maeriklavanderia.CRUD;



import java.sql.*;

public class Crud {





    private static final String JDBC_URL = "jdbc:sqlserver://localhost:1433;databaseName=bd_maerik";
    private static final String JDBC_USER = "sa";
    private static final String JDBC_PASSWORD = "1234";


    public static void main(String[] args) {
        CrudOperations crud = new CrudOperations();

        // Insertar un nuevo registro
    /*    crud.insert("Juan",
                "Perez",
                "juan@example.com",
                "722345673",
                "123");
*/

        // Actualizar un registro (supongamos que el registro con ID 1 existe)
     //  crud.update(3009, "Juanito"
             //  , "juanito@example.com");


        // Oobtener todos los registros
        crud.printTable();

        // Eliminar un registro (supongamos que el registro con ID 2 existe)
     // crud.delete(3007);


    }
}

class DatabaseManager {
    public static Connection getConnection() throws SQLException {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=bd_maerik";
        String user = "sa";
        String password = "1234";
        return DriverManager.getConnection(url, user, password);
    }
}

class CrudOperations {
    public void insert(String rfid , String nombre,String correo,String contrasena, String telefono,int saldo,String fecha ) {
        String sql = "INSERT INTO usuarios_local (rfid,nombre, correo, contrasena ,telefono,saldo,fecha) VALUES (?,?,?,?,?,?,?,?)";

        try (Connection conn = DatabaseManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, rfid);
            pstmt.setString(2, nombre);
            pstmt.setString(3, correo);
            pstmt.setString(4, contrasena);
            pstmt.setString(5, telefono);
            pstmt.setInt(6, saldo);
            pstmt.setString(7, fecha);

            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void selectAll() {
        String sql = "SELECT * FROM usuarios_local";

        try (Connection conn = DatabaseManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id"));
                System.out.println("RFID: " + rs.getString("rfid"));
                System.out.println("Nombre: " + rs.getString("nombre"));
                System.out.println("Correo: " + rs.getString("correo"));
                System.out.println("Contraseña: " + rs.getString("contrasena"));
                System.out.println("Telefono: " + rs.getString("telefono"));
                System.out.println("Saldo: " + rs.getString("saldo"));
                System.out.println("Fecha: " + rs.getString("fecha"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update(int id, String newName, String newEmail) {
        String sql = "UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?";

        try (Connection conn = DatabaseManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newName);
            pstmt.setString(2, newEmail);
            pstmt.setInt(3, id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void delete(int id) {
        String sql = "DELETE FROM Maerik WHERE id = ?";

        try (Connection conn = DatabaseManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void printTable()  {
        String sql = "SELECT * FROM usuarios_local";

        try (Connection conn = DatabaseManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            // Imprimir los nombres de las columnas
            for (int i = 1; i <= columnCount; i++) {
                System.out.printf("%-25s", metaData.getColumnName(i));
            }
            System.out.println(); // Salto de línea después de los nombres de las columnas

            // Imprimir los datos de la tabla

            while (rs.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    System.out.printf("%-25s", rs.getString(i));
                }
                System.out.println(); // Salto de línea después de cada fila de datos
            }


        } catch (SQLException e) {
            System.out.println("ERROR");
            e.printStackTrace();
        }
    }

}

