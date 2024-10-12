package com.example.maeriklavanderia.models;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Lavadoras")
public class Lavadoras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "estado")
    private String estado;
    @Column(name = "descripcion")
    private String descripcion;





}
