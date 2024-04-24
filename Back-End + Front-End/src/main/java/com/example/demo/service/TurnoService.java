



package com.example.demo.service;



import com.example.demo.exeptions.BadRequest;
import com.example.demo.model.Paciente;
import com.example.demo.model.Turno;
import com.example.demo.repository.OdontologoRepository;
import com.example.demo.model.Odontologo;
import com.example.demo.repository.PacienteRepository;
import com.example.demo.repository.TurnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TurnoService {
    @Autowired
    private TurnoRepository turnoRepository;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;
    //@Override

    public Optional<Turno> buscarxID(Long id)throws BadRequest {
        if (turnoRepository.findById(id).isEmpty()) {
            throw new BadRequest("No existe un turno con id: " + id);

        }

        return turnoRepository.findById(id);
    }

    // @Override
    public Turno guardar(Turno turno) throws BadRequest {


        boolean errado = false;
        String nota1 ="", nota2="";
        if(odontologoService.buscarxID(turno.getPaciente().getId()).isEmpty()){
            errado = true;
            nota1 = "No existe turno con Odontologo con id: "+turno.getOdontologo().getId();
            }


        if(pacienteService.buscarxID(turno.getPaciente().getId()).isEmpty()){
            nota2 = "No existe turno con Paciente id: "+ turno.getPaciente().getId();
            errado = true;
        }
        if (errado){
            throw  new BadRequest(nota1+" "+nota2);}


        Paciente paciente = pacienteService.buscarxID(turno.getPaciente().getId()).get();
        Odontologo odontologo = odontologoService.buscarxID(turno.getOdontologo().getId()).get();
        turno.setPaciente(paciente);
        turno.setOdontologo(odontologo);
        return  turnoRepository.save(turno);


    }
    public void borra(Long id) {
        turnoRepository.deleteById(id);
    }

    public Turno modifica(Turno turno) throws BadRequest {
        Long pacienteId = turno.getPaciente().getId();
        Long odontologoId = turno.getOdontologo().getId();

        Optional<Paciente> pacienteOptional = pacienteService.buscarxID(pacienteId);
        Optional<Odontologo> odontologoOptional = odontologoService.buscarxID(odontologoId);

        if (pacienteOptional.isEmpty()) {
            throw new IllegalArgumentException("No existe un Paciente con id: " + pacienteId);
        }

        if (odontologoOptional.isEmpty()) {
            throw new IllegalArgumentException("No existe un Odontólogo con id: " + odontologoId);
        }

        Paciente paciente = pacienteOptional.get();
        Odontologo odontologo = odontologoOptional.get();

        turno.setPaciente(paciente);
        turno.setOdontologo(odontologo);

        return turnoRepository.save(turno);
    }

    public List<Turno> listarTodos(){
        return turnoRepository.findAll();
    }


}