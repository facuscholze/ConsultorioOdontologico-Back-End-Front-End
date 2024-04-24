package com.example.demo.repository;

import com.example.demo.model.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo,Long> {
    @Query("SELECT o FROM Odontologo o WHERE UPPER(o.nombre) LIKE UPPER(concat('%', :nombre, '%')) AND UPPER(o.apellido) LIKE UPPER(concat('%', :apellido, '%'))")
    List<Odontologo> buscarPorNombreYApellido(@Param("nombre") String nombre, @Param("apellido") String apellido);
}
