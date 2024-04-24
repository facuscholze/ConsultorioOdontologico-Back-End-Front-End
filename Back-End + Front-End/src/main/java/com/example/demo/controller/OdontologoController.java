package com.example.demo.controller;





import com.example.demo.exeptions.BadRequest;
import com.example.demo.model.Odontologo;
import com.example.demo.service.OdontologoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/odontologo")
public class OdontologoController {

    @Autowired
    private OdontologoService odontologoService;

    @PostMapping("/registrar")
    public Odontologo registrarPaciente(@RequestBody Odontologo odontologo) {
        return odontologoService.guardar(odontologo);
    }

    @GetMapping("/odontologos")
    public ResponseEntity<ArrayList<Odontologo>> listarOdontologos(){
        return ResponseEntity.ok((ArrayList<Odontologo>) odontologoService.listarTodos());
    };


    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Odontologo>> buscar(@PathVariable Long id)throws BadRequest {
        Optional<Odontologo> odontologo = odontologoService.buscarxID(id);

        return ResponseEntity.ok(odontologo);
    }

    @PutMapping("/actualiza")
    public ResponseEntity<Odontologo> actualizar(@RequestBody Odontologo odontologo)throws BadRequest {
        ResponseEntity<Odontologo> response = null;
        Long idInteger = odontologo.getId();
        if (idInteger != null && odontologoService.buscarxID(odontologo.getId()) != null)
            response = ResponseEntity.ok(odontologoService.modifica(odontologo));
        else
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        return response;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Long id)  throws BadRequest{
        ResponseEntity<String> response = null;

        if (odontologoService.buscarxID(id) != null) {
            odontologoService.borra(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }
    @GetMapping("/buscarNombreApellido/{nombre}/{apellido}")
    public ResponseEntity<List<Odontologo>> buscarPorNombreApellido(@PathVariable String nombre, @PathVariable String apellido) throws BadRequest {
        List<Odontologo> odontologos = odontologoService.buscarPorNombreOApellido(nombre, apellido);

        if (odontologos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(odontologos);
    }



}
