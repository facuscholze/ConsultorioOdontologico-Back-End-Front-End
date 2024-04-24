package com.example.demo.model;

import javax.persistence.*;


import java.time.LocalDateTime;

@Entity
@Table(name="turnos")
public class Turno {
    @Id
    @SequenceGenerator(name="turno_sequence", sequenceName = "turno_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "turno_sequence")
    private Long id;

    @Column
    private LocalDateTime fecha;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
    @JoinColumn(name = "odontologo_id", nullable = false)
    private Odontologo odontologo;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST )
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    public Turno(LocalDateTime fecha, Odontologo odontologo, Paciente paciente) {
        this.fecha = fecha;
        this.odontologo = odontologo;
        this.paciente = paciente;
    }

    public Turno(Long id, LocalDateTime fecha, Odontologo odontologo, Paciente paciente) {
        this.id = id;
        this.fecha = fecha;
        this.odontologo = odontologo;
        this.paciente = paciente;
    }

    public Turno() {
    }

    public Long getId() {
        return id;
    }


    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Odontologo getOdontologo() {
        return odontologo;
    }

    public void setOdontologo(Odontologo odontologo) {
        this.odontologo = odontologo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }
}
