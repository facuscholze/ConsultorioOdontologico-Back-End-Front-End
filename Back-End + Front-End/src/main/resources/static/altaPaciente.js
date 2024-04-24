


// Obtener referencia al formulario
const formularioPaciente = document.getElementById('formulario paciente');

// Agregar evento de envío al formulario
formularioPaciente.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar la recarga de la página

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const calle = document.getElementById('calle').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const localidad = document.getElementById('localidad').value.trim();
    const provincia = document.getElementById('provincia').value.trim();
    const fechaIngreso = new Date().toISOString().split('T')[0];

    // Validar que todos los campos estén completos
    if (!nombre || !apellido || !dni || !calle || !numero || !localidad || !provincia) {
        console.error('Todos los campos son requeridos');
        return;
    }

    const paciente = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        fecha_ingreso: fechaIngreso,
        direccion: {
            calle: calle,
            numero: numero,
            localidad: localidad,
            provincia: provincia
        }
    };

    fetch('http://localhost:8080/paciente/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
    })
    .then(response => response.json())
    .then(data => {
        obtenerPacientes()
        console.log('Paciente dado de alta:', data);

        // Realizar acciones adicionales después de dar de alta al paciente
    })
    .catch(error => {
        console.error('Error al dar de alta al paciente:', error);
        // Manejar el error de alguna manera
    });

    formularioPaciente.reset();
});

// Obtener referencia al contenedor de la lista de pacientes
const pacientesLista = document.getElementById('pacientes-lista');

// Función para obtener la lista de pacientes desde el servidor
function obtenerPacientes() {
  fetch('http://localhost:8080/paciente/pacientes')
    .then(response => response.json())
    .then(data => {
      // Limpiar la lista existente
      pacientesLista.innerHTML = '';

      // Generar la nueva lista
      data.forEach(paciente => {
        const item = document.createElement('div');
        item.innerHTML = `<div class="pacientes-lista">
        <h3>Paciente: ${paciente.id}</h3>
          <p>${paciente.nombre} ${paciente.apellido}</p>
          <p>DNI: ${paciente.dni}</p>
          <button onclick="eliminarPaciente(${paciente.id}, '${paciente.nombre}', '${paciente.apellido}')">Eliminar</button>
        </div>`;
        pacientesLista.appendChild(item);
      });
    })
    .catch(error => {
      console.log('Error al obtener la lista de pacientes:', error);
      // Manejar el error de alguna manera
    });
}

function eliminarPaciente(id, nombre, apellido) {
  const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al paciente ${nombre} ${apellido}?`);
  if (!confirmacion) {
    return; // Si el usuario cancela, no se realiza la eliminación
  }

  fetch(`http://localhost:8080/paciente/eliminar/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        alert('NO SE PUDO ELIMINAR EL PACIENTE PORQUE ESTA ASOCIADO A UN TURNO')
        throw new Error('NO SE PUDO ELIMINAR EL PACIENTE PORQUE ESTA ASOCIADO A UN TURNO');
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
      obtenerPacientes();
      buscarPacientePorId();
      buscarPacientePorNombreApellido();
    })
    .catch(error => {
      console.log('Error al eliminar al paciente:', error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    });
}

function buscarPacientePorId() {
  const id = document.getElementById('buscarId').value;

  fetch(`http://localhost:8080/paciente/buscar/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo buscar al paciente');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.hasOwnProperty('id')) {
        mostrarResultado(data);
        ocultarMensajeNoEncontrado();
      } else {
        mostrarMensajeNoEncontrado();
        ocultarResultado();
      }
    })
    .catch(error => {
      mostrarMensajeNoEncontrado();
      ocultarResultado();
      console.log('Error al buscar al paciente:', error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    });
}

function mostrarMensajeNoEncontrado() {
  document.getElementById('mensaje-no-encontrado').style.display = 'block';
}

function ocultarMensajeNoEncontrado() {
  document.getElementById('mensaje-no-encontrado').style.display = 'none';
}
function mostrarMensaje(mensaje) {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `<p>${mensaje}</p>`;
}

function mostrarResultado(paciente) {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <h3>Detalles del Paciente:</h3>
    <p>ID: ${paciente.id}</p>
    <p>Nombre: ${paciente.nombre}</p>
    <p>Apellido: ${paciente.apellido}</p>
    <p>DNI: ${paciente.dni}</p>

    <button onclick="eliminarPaciente(${paciente.id}, '${paciente.nombre}', '${paciente.apellido}')">Eliminar</button>
  `;
}

function ocultarResultado() {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = '';
}

function buscarPacientePorNombreApellido() {
  const nombre = document.getElementById('buscarNombre').value || '';
  const apellido = document.getElementById('buscarApellido').value || '';

  fetch(`http://localhost:8080/paciente/buscarNombreApellido/${nombre}/${apellido}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        mostrarResultadoNombreApellido(data);
        mostrarMensajeNombreApellido('');
      } else {
        mostrarResultadoNombreApellido([]);
        mostrarMensajeNombreApellido('No se encontraron pacientes con el nombre y apellido especificados.');
      }
    })
    .catch(error => {
      console.log('Error al buscar pacientes:', error);
      mostrarResultadoNombreApellido([]);
      mostrarMensajeNombreApellido('No se encontraron pacientes con el nombre y apellido especificados.');
    });
}

function mostrarResultadoNombreApellido(data) {
  const resultadoDiv = document.getElementById('resultado-nombre-apellido');
  resultadoDiv.innerHTML = '';

  if (data.length > 0) {
    data.forEach(paciente => {
      const pacienteDiv = document.createElement('div');
      pacienteDiv.innerHTML = `
        <h3>Detalles del Paciente:</h3>
        <p>ID: ${paciente.id}</p>
        <p>Nombre: ${paciente.nombre}</p>
        <p>Apellido: ${paciente.apellido}</p>
        <p>DNI: ${paciente.dni}</p>
        <button onclick="eliminarPaciente(${paciente.id}, '${paciente.nombre}', '${paciente.apellido}')">Eliminar</button>
      `;
      resultadoDiv.appendChild(pacienteDiv);
    });
  }
}

function mostrarMensajeNombreApellido(mensaje) {
  const mensajeDiv = document.getElementById('mensaje-no-encontrado-nombre-apellido');
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.display = mensaje ? 'block' : 'none';
}

// Llamar a la función para obtener la lista de pacientes inicialmente
mostrarMensajeNoEncontrado();
mostrarMensajeNombreApellido('No se encontraron pacientes con el nombre y apellido especificados.');
obtenerPacientes();