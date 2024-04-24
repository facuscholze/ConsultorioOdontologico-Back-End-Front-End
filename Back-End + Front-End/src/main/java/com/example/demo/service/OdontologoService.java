package com.example.demo.service;


import com.example.demo.exeptions.BadRequest;
import com.example.demo.model.Paciente;
import com.example.demo.repository.OdontologoRepository;
import com.example.demo.model.Odontologo;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OdontologoService {
    private static final Logger logger = LogManager.getLogger(OdontologoService.class);
    @Autowired
    private OdontologoRepository odontologoRepository;


    //@Override
    public Optional<Odontologo> buscarxID(Long id) throws BadRequest {
        if (odontologoRepository.findById(id).isEmpty()) {
            logger.error("No existe un odontologo con id: " + id);
            throw new BadRequest("No existe un odontologo con id: " + id);
        }
        logger.info("odontologo id. "+ id +" encontrado");
        return odontologoRepository.findById(id);
    }

    // @Override
    public Odontologo guardar(Odontologo odontologo) {
        logger.info("odontologo creado");
        return odontologoRepository.save(odontologo);
    }

    public void borra(Long id) {
        logger.info("odontologo id. "+ id +" borrado");
        odontologoRepository.deleteById(id);
    }

    public Odontologo modifica(Odontologo odontologo) {
        odontologoRepository.save(odontologo);
        logger.info("odontologo id. "+ odontologo.getId() +" modificado");
        return odontologo;
    }

    public List<Odontologo> listarTodos() {
        logger.info("listando odontologos");
        return odontologoRepository.findAll();
    }

    public List<Odontologo> buscarPorNombreOApellido(String nombre, String apellido) {
        List<Odontologo> odontologos = odontologoRepository.buscarPorNombreYApellido(nombre, apellido);

        return odontologos;
    }
}

