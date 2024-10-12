package com.example.maeriklavanderia.websocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private WebSocketHandler webSocketHandler;

    @Scheduled(fixedRate = 5000) // Ejecutar cada 5 segundos
    public void checkAndUpdateStatus() {
        webSocketHandler.broadcastStatus();
        System.out.println("WebSocketHandler ----------> Valida cada 5 seg ");
    }
}
