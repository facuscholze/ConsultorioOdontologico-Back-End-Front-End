package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="pacientes")
public class Paciente {
    @Id
    @SequenceGenerator(name="paciente_sequence", sequenceName = "paciente_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "paciente_sequence")
    private Long id;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String apellido;
    @Column(nullable = false)
    private String dni;
    @Column(nullable = false)
    private LocalDate fecha_ingreso;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "direccion_id",referencedColumnName = "id")
    private Direccion direccion;

    @OneToMany(mappedBy = "paciente", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Turno> turnos= new HashSet<>();

    public Paciente() {

    }

    public Paciente(String nombre, String apellido, String dni, LocalDate fecha_ingreso, Direccion direccion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.fecha_ingreso = fecha_ingreso;
        this.direccion = direccion;
    }

    public Long getId() {
        return id;
    }

    public Set<Turno> getTurnos() {
        return turnos;
    }

    public void setTurnos(Set<Turno> turnos) {
        this.turnos = turnos;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public LocalDate getFecha_ingreso() {
        return fecha_ingreso;
    }

    public void setFecha_ingreso(LocalDate fecha_ingreso) {
        this.fecha_ingreso = fecha_ingreso;
    }

    public Direccion getDireccion() {
        return direccion;
    }

    public void setDomicilio(Direccion domicilio) {
        this.direccion = domicilio;
    }

    @Override
    public String toString() {
        return "Paciente{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", dni='" + dni + '\'' +
                ", fecha_ingreso=" + fecha_ingreso +
                ", domicilio=" + direccion +
                '}';
    }
}
