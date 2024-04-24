package com.example.demo.service;



import com.example.demo.exeptions.BadRequest;
import com.example.demo.model.Odontologo;
import com.example.demo.repository.PacienteRepository;

import com.example.demo.model.Paciente;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {


@Autowired
    private PacienteRepository pacienteRepository;

    private static final Logger logger = LogManager.getLogger(PacienteService.class);

    //@Override
    public Optional<Paciente> buscarxID(Long id) throws BadRequest {
        if(pacienteRepository.findById(id).isEmpty()){
            logger.error("No existe un paciente con id: " + id);
            throw  new BadRequest("No existe un paciente con id: "+id);
        }
        logger.info("paciente id. "+ id +" encontrado");
        return pacienteRepository.findById(id);

    }

    // @Override
    public Paciente guardar(Paciente paciente) {
        logger.info("paciente registrado");
        return pacienteRepository.save(paciente);
    }
    public void borra(Long id) {

        logger.info("paciente id. "+ id +" borrado");
        pacienteRepository.deleteById(id);
    }

    public Paciente modifica(Paciente paciente){
        logger.info("paciente id. "+ paciente.getId() +" modificado");
        pacienteRepository.save(paciente);
        return paciente;
    }

    public List<Paciente> listarTodos(){

        logger.info("listando pacientes");
        return pacienteRepository.findAll();
    }

    public List<Paciente> buscarPorNombreOApellido(String nombre, String apellido) {
        List<Paciente> pacientes = pacienteRepository.buscarPorNombreYApellido(nombre, apellido);

        return pacientes;
    }

}
