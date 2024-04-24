
// Obtener referencia al select de odontólogos
const selectOdontologo = document.getElementById('odontologo');

// Realizar solicitud Fetch a la API de odontólogos
fetch('http://localhost:8080/odontologo/odontologos')
.then(response => response.json())
.then(data => {
  // Recorrer los datos de los odontólogos y agregar opciones al select
  data.forEach(odontologo => {
    const option = document.createElement('option');
    option.value = odontologo.id;
    option.textContent = odontologo.nombre+" "+odontologo.apellido;
    selectOdontologo.appendChild(option);
  });
})
.catch(error => {
  console.error('Error:', error);
});


// Obtener referencia al select de odontólogos
const selectPaciente = document.getElementById('paciente');

// Realizar solicitud Fetch a la API de odontólogos
fetch('http://localhost:8080/paciente/pacientes')
.then(response => response.json())
.then(data => {
  // Recorrer los datos de los odontólogos y agregar opciones al select
  data.forEach(paciente => {
    const option = document.createElement('option');
    option.value = paciente.id;
    option.textContent = paciente.nombre+" "+paciente.apellido;;
    selectPaciente.appendChild(option);
  });
})
.catch(error => {
  console.error('Error:', error);
});











 document.getElementById('formulario turno').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores seleccionados
    var pacienteSeleccionado = document.getElementById('paciente').value;
    var fechaSeleccionada = document.getElementById('fecha').value;
    var odontologoSeleccionado = document.getElementById('odontologo').value;

    // Crear el objeto JSON con los datos del turno
    var turno = {
      fecha: fechaSeleccionada,
      odontologo: {
        id: parseInt(odontologoSeleccionado)
      },
      paciente: {
        id: parseInt(pacienteSeleccionado)
      }
    };

    // Hacer algo con los valores seleccionados (por ejemplo, enviarlos a través de AJAX)
    fetch('http://localhost:8080/turno/registrar', {
      method: 'POST',
      body: JSON.stringify(turno),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Hacer algo con la respuesta del servidor
      obtenerTurnos()
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });

    // Limpiar el formulario
    document.getElementById('formulario turno').reset();
  });





// Obtener referencia al contenedor de la lista de pacientes
const turnosLista = document.getElementById('turno-lista');

// Función para obtener la lista de pacientes desde el servidor
function obtenerTurnos() {
  fetch('http://localhost:8080/turno/turnos')
    .then(response => response.json())
    .then(data => {
      // Limpiar la lista existente
      turnosLista.innerHTML = '';

      // Generar la nueva lista
      data.forEach(turno => {
        const item = document.createElement('div');

        item.innerHTML = `<div class="turnos-lista">
        <h3>Turno: ${turno.id}</h3>
            <p>Odontólogo: ${turno.odontologo.nombre} ${turno.odontologo.apellido}</p>
            <p>Paciente: ${turno.paciente.nombre} ${turno.paciente.apellido}</p>
            <p>Fecha: ${turno.fecha}</p>
            <button onclick="eliminarTurno(${turno.id})">Eliminar</button>
          </div>`;
        turnosLista.appendChild(item);
      });
    })
    .catch(error => {
      console.log('Error al obtener la lista de pacientes:', error);
      // Manejar el error de alguna manera
    });
}













// Obtener referencia al select de odontólogos
const editarOdontologo = document.getElementById('editarOdontologo');

// Realizar solicitud Fetch a la API de odontólogos
fetch('http://localhost:8080/odontologo/odontologos')
.then(response => response.json())
.then(data => {
  // Recorrer los datos de los odontólogos y agregar opciones al select
  data.forEach(odontologo => {
    const option = document.createElement('option');
    option.value = odontologo.id;
    option.textContent = odontologo.nombre+" "+odontologo.apellido;
    editarOdontologo.appendChild(option);
  });
})
.catch(error => {
  console.error('Error:', error);
});



// Obtener referencia al select de odontólogos
const editartPaciente = document.getElementById('editarPaciente');

// Realizar solicitud Fetch a la API de odontólogos
fetch('http://localhost:8080/paciente/pacientes')
.then(response => response.json())
.then(data => {
  // Recorrer los datos de los odontólogos y agregar opciones al select
  data.forEach(paciente => {
    const option = document.createElement('option');
    option.value = paciente.id;
    option.textContent = paciente.nombre+" "+paciente.apellido;;
    editarPaciente.appendChild(option);
  });
})
.catch(error => {
  console.error('Error:', error);
});



// Obtener referencia al formulario de modificación del turno
const editarTurnoForm = document.getElementById('editarTurno');

// Agregar evento submit al formulario
editarTurnoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores del formulario
  const eturnoId = document.getElementById('turnoId').value;
  const epacienteSeleccionado = document.getElementById('editarPaciente').value;
  const efechaSeleccionada = document.getElementById('editarFecha').value;
  const eodontologoSeleccionado = document.getElementById('editarOdontologo').value;

  // Crear el objeto JSON con los datos del turno modificado
  var turnoModificado = {
        id: eturnoId,
        fecha: efechaSeleccionada,
        odontologo: {
          id: parseInt(eodontologoSeleccionado)
        },
        paciente: {
          id: parseInt(epacienteSeleccionado)
        }
      };

  // Realizar solicitud Fetch para modificar el turno en el servidor
  fetch('http://localhost:8080/turno/actualiza', {
    method: 'PUT',
    body: JSON.stringify(turnoModificado),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      // Hacer algo con la respuesta del servidor
      obtenerTurnos()
      console.log(data);
    })
    .catch(error => {
      alert("id de turno no encontrado")
      console.log('Error al modificar el turno:', error);
    });

  // Limpiar el formulario
  editarTurnoForm.reset();
});



function eliminarTurno(id) {


  fetch(`http://localhost:8080/turno/eliminar/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo eliminar el turno');
      }
      // No analizar la respuesta como JSON si está vacía
      if (response.status === 204) {
        return null; // Retornar null para indicar que no hay datos
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log(data); // Mostrar el mensaje de confirmación del servidor
      }
      // Actualizar la lista después de eliminar
      obtenerTurnos();

    })
    .catch(error => {
      console.log('Error al eliminar el turno:', error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    });
}





obtenerTurnos()




