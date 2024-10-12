package com.example.maeriklavanderia.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private static final String DB_URL = "jdbc:sqlserver://localhost:1433;databaseName=bd_maerik";
    private static final String USER = "sa";
    private static final String PASS = "1234";

    private Map<String, WebSocketSession> sessions = new HashMap<>();


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
        System.out.println("Cliente conectado: " + session.getId());
        broadcastStatus();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Obtener el mensaje recibido
        String payload = message.getPayload();
        System.out.println("Mensaje recibido del cliente: " + payload);

        // Procesar el mensaje y actualizar la base de datos
        if (payload.startsWith("estado=")) {
            String estadoStr = payload.substring("estado=".length());
            int estado = Integer.parseInt(estadoStr);
            updateDatabaseEstado(estado);
        }
    }

    private void updateDatabaseEstado(int estado) {
        // Actualizar el valor de estado en la base de datos
        try (Connection connection = DriverManager.getConnection(DB_URL, USER, PASS);
             Statement statement = connection.createStatement()) {

            // Construir la consulta SQL para actualizar el estado
            String updateQuery = "UPDATE lavadoras SET estado = " + estado + " WHERE id = 1"; // Ajusta la condición WHERE según tus necesidades

            // Ejecutar la actualización
            statement.executeUpdate(updateQuery);
            System.out.println("Estado actualizado a " + estado);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error al actualizar el estado en la base de datos.");
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
        System.out.println("Cliente desconectado: " + session.getId());
    }

    public void broadcastStatus() {
        try (Connection connection = DriverManager.getConnection(DB_URL, USER, PASS);
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery("SELECT estado FROM lavadoras")) {

            if (resultSet.next()) {
                int currentState = resultSet.getInt("estado");
                System.out.println("Estado actual: " + currentState);
                if (currentState == 1) { // Verifica si el estado ha cambiado
                    System.out.println("entra al if Verifica si el estado ha cambiado");
                    TextMessage message = new TextMessage(String.valueOf(currentState));
                    for (WebSocketSession s : sessions.values()) {
                        System.out.println("entra al for");
                        if (s.isOpen()) {
                            System.out.println("Mensaje enviado a cliente: " + s.getId() + " con estado: " + currentState);
                            s.sendMessage(message);

                        }
                    }
                }else {

                    System.out.println("Estado actual en el else: " + currentState);
                    TextMessage message = new TextMessage(String.valueOf(currentState));
                    for (WebSocketSession s : sessions.values()) {
                        System.out.println("entra al for");
                        if (s.isOpen()) {
                            System.out.println("Mensaje enviado a cliente en ELSE: " + s.getId() + " con estado: " + currentState);
                            s.sendMessage(message);

                        }
                    }
                    System.out.println("El estado sigue siendo 0");
                }
            } else {
                System.out.println("El estado sigue siendo 0");
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error en la consulta SQL o envío de mensajes.");
        }
    }
}