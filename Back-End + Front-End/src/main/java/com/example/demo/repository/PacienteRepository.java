package com.example.demo.repository;


import com.example.demo.model.Odontologo;
import com.example.demo.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PacienteRepository extends JpaRepository<Paciente,Long> {

    @Query("SELECT o FROM Paciente o WHERE UPPER(o.nombre) LIKE UPPER(concat('%', :nombre, '%')) AND UPPER(o.apellido) LIKE UPPER(concat('%', :apellido, '%'))")
    List<Paciente> buscarPorNombreYApellido(@Param("nombre") String nombre, @Param("apellido") String apellido);
}
