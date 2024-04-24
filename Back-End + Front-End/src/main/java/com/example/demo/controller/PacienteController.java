package com.example.demo.controller;

import com.example.demo.exeptions.BadRequest;
import com.example.demo.model.Odontologo;
import com.example.demo.model.Paciente;
import com.example.demo.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    @Autowired
    PacienteService pacienteService;

    @PostMapping("/registrar")
    public ResponseEntity<Paciente> registrarPaciente(@RequestBody Paciente paciente) {

        return ResponseEntity.ok(pacienteService.guardar(paciente));

    }


    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Paciente>> buscar(@PathVariable Long id)throws BadRequest {
        Optional<Paciente> paciente = pacienteService.buscarxID(id);

        return ResponseEntity.ok(paciente);
    }





    @PutMapping("/actualiza")
    public ResponseEntity<Paciente> actualizar(@RequestBody Paciente paciente)throws BadRequest {
        ResponseEntity<Paciente> response = null;

        if (paciente.getId() != null && pacienteService.buscarxID(paciente.getId()).isPresent())
            response = ResponseEntity.ok(pacienteService.modifica(paciente));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }


    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id)throws BadRequest {
        ResponseEntity<String> response = null;

        if (pacienteService.buscarxID(id).isPresent()) {
            pacienteService.borra(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Paciente con ID:"+id +" eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }



    @GetMapping("/pacientes")
    public ResponseEntity<ArrayList<Paciente>> listarPacientes(){
        return ResponseEntity.ok((ArrayList<Paciente>) pacienteService.listarTodos());
    };

    @GetMapping("/buscarNombreApellido/{nombre}/{apellido}")
    public ResponseEntity<List<Paciente>> buscarPorNombreApellido(@PathVariable String nombre, @PathVariable String apellido) throws BadRequest {
        List<Paciente> pacientes = pacienteService.buscarPorNombreOApellido(nombre, apellido);

        if (pacientes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(pacientes);
    }



}

