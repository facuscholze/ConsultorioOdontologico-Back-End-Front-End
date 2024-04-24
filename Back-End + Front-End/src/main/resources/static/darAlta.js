// Obtener referencia al botón
const btnRegistrar = document.getElementById('btnRegistrar');

// Obtener referencia al formulario
const formulario = document.getElementById('formulario odontologo');

// Agregar evento submit al formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar la recarga de la página

  darDeAltaOdontologo();
});

function darDeAltaOdontologo() {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const numeroMatricula = document.getElementById('Matricula').value.trim();
if (!nombre || !apellido || !numeroMatricula) {
        console.error('Todos los campos son requeridos');
        return;
    }
  const odontologo = {
    nombre: nombre,
    apellido: apellido,
    numeroMatricula: numeroMatricula,
  };

  fetch('http://localhost:8080/odontologo/registrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(odontologo)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Odontólogo dado de alta:', data);
      obtenerOdontologos()

    })
    .catch(error => {
      console.error('Error al dar de alta el odontólogo:', error);
      // Manejar el error de alguna manera
    });

        formulario.reset();

}


// Obtener referencia al contenedor de la lista de odontólogos
const odontologosLista = document.getElementById('odontologos-lista');

// Función para obtener la lista de odontólogos desde el servidor
function obtenerOdontologos() {
  fetch('http://localhost:8080/odontologo/odontologos')
    .then(response => response.json())
    .then(data => {
      // Limpiar la lista existente
      odontologosLista.innerHTML = '';

      // Generar la nueva lista
      data.forEach(odontologo => {
        const item = document.createElement('div');
        item.innerHTML = `<div class="odontologos-lista">
          <h3>${odontologo.nombre} ${odontologo.apellido}</h3>
          <p>Matrícula: ${odontologo.numeroMatricula}</p>
          <button onclick="eliminarOdontologo(${odontologo.id}, '${odontologo.nombre}', '${odontologo.apellido}')">Eliminar</button>
        </div>`;
        odontologosLista.appendChild(item);
      });
    })
    .catch(error => {
      console.log('Error al obtener la lista de odontólogos:', error);
      // Manejar el error de alguna manera
    });
}

function eliminarOdontologo(id, nombre, apellido) {
  const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar al odontólogo ${nombre} ${apellido}?`);
  if (!confirmacion) {
    return; // Si el usuario cancela, no se realiza la eliminación
  }

  fetch(`http://localhost:8080/odontologo/eliminar/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
      alert('NO SE PUDO ELIMINAR EL PACIENTE PORQUE ESTA ASOCIADO A UN TURNO')
        throw new Error('NO SE PUDO ELIMINAR EL ODONTOLOGO PORQUE ESTA ASOCIADO A UN TURNO');
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
      obtenerOdontologos();
      buscarPorId();
      buscarPorNombreApellido();
    })
    .catch(error => {
      console.log('Error al eliminar el odontólogo:', error);
      // Manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
    });
}
function buscarPorId() {
  const id = document.getElementById('buscarId').value;

  fetch(`http://localhost:8080/odontologo/buscar/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo buscar el odontólogo');
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
      console.log('Error al buscar el odontólogo:', error);
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

function mostrarResultado(odontologo) {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = `
    <h3>Detalles del Odontólogo:</h3>
    <p>ID: ${odontologo.id}</p>
    <p>Nombre: ${odontologo.nombre}</p>
    <p>Apellido: ${odontologo.apellido}</p>
    <button onclick="eliminarOdontologo(${odontologo.id}, '${odontologo.nombre}', '${odontologo.apellido}')">Eliminar</button>
  `;
}
function ocultarResultado(odontologo) {
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = ""
}



function buscarPorNombreApellido() {
  const nombre = document.getElementById('buscarNombre').value || "     ";
  const apellido = document.getElementById('buscarApellido').value || "     ";

  fetch(`http://localhost:8080/odontologo/buscarNombreApellido/${nombre}/${apellido}`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        mostrarResultadoNombreApellido(data);
        mostrarMensajeNombreApellido('');
      } else {
        mostrarResultadoNombreApellido([]);
        mostrarMensajeNombreApellido('No se encontraron odontólogos con el nombre y apellido especificados.');
      }
    })
    .catch(error => {
      console.log('Error al buscar odontólogos:', error);
      mostrarResultadoNombreApellido([]);
      mostrarMensajeNombreApellido('No se encontraron odontólogos con el nombre y apellido especificados.');
    });
}

function mostrarResultadoNombreApellido(data) {
  const resultadoDiv = document.getElementById('resultado-nombre-apellido');
  resultadoDiv.innerHTML = '';

  if (data.length > 0) {
    data.forEach(odontologo => {
      const odontologoDiv = document.createElement('div');
      odontologoDiv.innerHTML = `
        <h3>Detalles del Odontólogo:</h3>
            <p>ID: ${odontologo.id}</p>
            <p>Nombre: ${odontologo.nombre}</p>
            <p>Apellido: ${odontologo.apellido}</p>
            <button onclick="eliminarOdontologo(${odontologo.id}, '${odontologo.nombre}', '${odontologo.apellido}')">Eliminar</button>
      `;
      resultadoDiv.appendChild(odontologoDiv);
    });
  }
}





function mostrarMensajeNombreApellido(mensaje) {
  const mensajeDiv = document.getElementById('mensaje-no-encontrado-nombre-apellido');
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.display = mensaje ? 'block' : 'none';
}
// Llamar a la función para obtener la lista de odontólogos inicialmente
mostrarMensajeNoEncontrado()
mostrarMensajeNombreApellido('No se encontraron odontólogos con el nombre y apellido especificados.')
obtenerOdontologos();

