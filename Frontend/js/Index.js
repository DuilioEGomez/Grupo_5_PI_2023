// Obtener el username del localstorage y escribirlo en H1 de la pagina.
const h1Elemento = document.querySelector('.main-header h1');
const username = localStorage.getItem('username');

if (username) {
    h1Elemento.textContent = `Dashboard ${username}`;
} else {
    h1Elemento.textContent = 'Grupo 5 - Proyecto Informatico - UPSO 2023';
}


// Stock
document.getElementById('stockButton').addEventListener('click', function() {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/stock`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Stock:', data);
        construirTabla(data["stock"]);
    })
    .catch(error => console.error('Error en la solicitud:', error));
});

// Ranking Productos 
document.getElementById('rankingProductoButton').addEventListener('click', function() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/ranking_productos`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ranking por Producto:', data);

            // Llama a la función para construir la tabla
            construirTabla(data["ranking productos"]);
        })
        .catch(error => console.error('Error en la solicitud:', error));
});

// Ranking Servicios
document.getElementById('rankingServicioButton').addEventListener('click', function() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/ranking_servicios`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ranking por Servicio:', data);

            // Llama a la función para construir la tabla
            construirTabla(data["ranking servicios"]);
        })
        .catch(error => console.error('Error en la solicitud:', error));
});

function construirTabla(data) {
    const contenedor1 = document.getElementById('contenedor1');

    // Limpia el contenedor
    contenedor1.innerHTML = '';

    // Crea la tabla
    const table = document.createElement('table');
    
    const headerRow = table.insertRow(0);
    Object.keys(data[0]).forEach(key => {
        // Excluye "producto_id" 
        if (key !== "producto_id") {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = key;
        }
    });

    // Itera en data y va creando la tabla
    data.forEach(item => {
        const row = table.insertRow();
        Object.keys(item).forEach(key => {
            
            if (key !== "producto_id") {
                const cell = row.insertCell();
                cell.textContent = item[key];
            }
        });
    });

    // Agrega la tabla al contenedor
    contenedor1.appendChild(table);
}


// Ranking Clientes
  document.getElementById('rankingClienteButton').addEventListener('click', function() {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/ranking_clientes`,{
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ranking por Cliente:', data);

        construirTabla(data["ranking clientes"]);
      })
      .catch(error => console.error('Error en la solicitud:', error));
  });

  document.getElementById('historialVentasButton').addEventListener('click', function() {
    
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/historial`,{
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Historial de Ventas:', data);

        construirTabla(data["historial"]);
      })
      .catch(error => console.error('Error en la solicitud:', error));
  });



//Clientes del usuario X
document.getElementById('clientesButton').addEventListener('click', function() {
    // Llama a la función para cargar clientes
    cargarClientes();
});

function cargarClientes() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/cliente`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Clientes del usuario X:', data);
        
        const contenedor1 = document.getElementById('contenedor1');

        // limpiamos el contenedor
        contenedor1.innerHTML = '';

        // Creamos la tabla
        const table = document.createElement('table');

        
        const headerRow = table.insertRow(0);
        const headerApellido = headerRow.insertCell(0);
        const headerNombre = headerRow.insertCell(1);
        const headerCuit = headerRow.insertCell(2);
        const headerAcciones = headerRow.insertCell(3);

        headerApellido.textContent = 'Apellido';
        headerNombre.textContent = 'Nombre';
        headerCuit.textContent = 'CUIT';
        headerAcciones.textContent = 'Acciones';

        // iteramos en clientes e insertamos los datos
        data.clientes.forEach(cliente => {
            const row = table.insertRow();
            const cellApellido = row.insertCell(0);
            const cellNombre = row.insertCell(1);
            const cellCuit = row.insertCell(2);
            const cellAcciones = row.insertCell(3);

            
            cellApellido.textContent = cliente.apellido;
            cellNombre.textContent = cliente.nombre;
            cellCuit.textContent = cliente.cuit;

            // Inputs 
            const inputApellido = document.createElement('input');
            const inputNombre = document.createElement('input');
            const inputCuit = document.createElement('input');

            inputApellido.value = cliente.apellido;
            inputNombre.value = cliente.nombre;
            inputCuit.value = cliente.cuit;

            // boton para empezar a editar
            const btnModificar = document.createElement('button');
            btnModificar.textContent = 'Modificar';
            btnModificar.addEventListener('click', () => {
                // cambiamos a modo editor
                cellApellido.innerHTML = '';
                cellNombre.innerHTML = '';
                cellCuit.innerHTML = '';

                cellApellido.appendChild(inputApellido);
                cellNombre.appendChild(inputNombre);
                cellCuit.appendChild(inputCuit);

                // mostramos el boton "Aplicar"
                cellAcciones.appendChild(btnAplicar);
            });

            // creamos el boton aplicar
            const btnAplicar = document.createElement('button');
            btnAplicar.textContent = 'Aplicar';
            btnAplicar.addEventListener('click', () => {
                
                const updatedData = {
                    nombre: inputNombre.value,
                    apellido: inputApellido.value,
                    cuit: parseInt(inputCuit.value, 10) 
                };

                
                fetch(`http://127.0.0.1:5106/user/${id}/cliente/${cliente.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': id,
                        'x-access-token': token
                    },
                    body: JSON.stringify(updatedData)
                })
                .then(response => response.json())
                .then(data => console.log('Response from Modificar:', data))
                .catch(error => console.error('Error al Modificar:', error));

                // Actualizamos los campos
                cellApellido.textContent = updatedData.apellido;
                cellNombre.textContent = updatedData.nombre;
                cellCuit.textContent = updatedData.cuit;

                
                // Quitamos los campos de entrada y el boton "Aplicar"
                cellAcciones.innerHTML = '';
                cellAcciones.appendChild(btnModificar);

                cargarClientes();

            });

            // Boton Borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.addEventListener('click', () => {
                
                fetch(`http://127.0.0.1:5106/user/${id}/cliente/${cliente.id}`, {
                    method: 'DELETE',
                    headers: {
                        'user-id': id,
                        'x-access-token': token
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from Borrar:', data);
                    alert(`${JSON.stringify(data["message"], null, 2)}`);
                    // Recargamos 
                    cargarClientes();
                })
                .catch(error => console.error('Error al Borrar:', error));
            });

            // Agregamos botones "Modificar" y "Borrar" 
            cellAcciones.appendChild(btnModificar);
            cellAcciones.appendChild(btnBorrar);
        });

        // Agrega la tabla al contenedor
        contenedor1.appendChild(table);
    })
    
    .catch(error => console.error('Error en la solicitud:', error));
};

//Facturas del usuario X
document.getElementById('facturasButton').addEventListener('click', function() {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/facturas`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de las faturas del usuario X:', data);
    })
    .catch(error => console.error('Error en la solicitud:', error));
});