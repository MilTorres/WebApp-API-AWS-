package com.example.maeriklavanderia.repository;

import com.example.maeriklavanderia.models.Usuario;

import java.util.List;

public interface UsuarioDao  {

    List<Usuario> getUsuarios();

    Usuario obtenerPorId(long id);

    Usuario obtenerPorRfId(String rfid);

    void deleteUsuario(Long id);

    void registrar(Usuario usuario);

    void actualizar(Long id, Usuario usuario);

    Usuario validarLogin(String correo, String pass );

}
