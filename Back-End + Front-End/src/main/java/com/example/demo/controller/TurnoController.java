package com.example.demo.controller;

import com.example.demo.exeptions.BadRequest;
import com.example.demo.model.Odontologo;
import com.example.demo.model.Paciente;
import com.example.demo.model.Turno;
import com.example.demo.service.OdontologoService;
import com.example.demo.service.PacienteService;
import com.example.demo.service.TurnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turno")
public class TurnoController  {
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private PacienteService pacienteService;
    @Autowired
    private OdontologoService odontologoService;



    @PostMapping("/registrar")
    public ResponseEntity<Turno> registrarTurno(@RequestBody Turno turno) throws BadRequest {
        ResponseEntity<Turno> respuesta;
        respuesta = new ResponseEntity<>(turnoService.guardar(turno),HttpStatus.CREATED);
        return respuesta;
    }


    @GetMapping("/turnos")
    public List<Turno> listarOdontologos(){
        return turnoService.listarTodos();
    };





    @PutMapping
    public ResponseEntity<Turno> actualizarTurno(@RequestBody Turno turno) throws BadRequest {
        return ResponseEntity.ok(turnoService.modifica(turno));

    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Turno>> buscar(@PathVariable Long id)throws BadRequest {
        Optional<Turno> turno = turnoService.buscarxID(id);

        return ResponseEntity.ok(turno);
    }
    @PutMapping("/actualiza")
    public ResponseEntity<Turno> actualizar(@RequestBody Turno turnoModificado) throws BadRequest {
        ResponseEntity<Turno> response = null;

        if (turnoModificado != null && turnoModificado.getId() != null && turnoService.buscarxID(turnoModificado.getId()).isPresent()) {
            response = ResponseEntity.ok(turnoService.modifica(turnoModificado));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }



    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id)throws BadRequest {
        ResponseEntity<String> response = null;

        if (turnoService.buscarxID(id).isPresent()) {
            turnoService.borra(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Turno con ID:"+id +" eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }


}
