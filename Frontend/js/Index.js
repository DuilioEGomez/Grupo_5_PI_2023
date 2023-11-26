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


//   document.getElementById('rankingProductoButton').addEventListener('click', function() {

//     const id = localStorage.getItem('id');
//     const token = localStorage.getItem('token');

//     fetch(`http://127.0.0.1:5106/user/${id}/ranking_productos`,{
//         headers: {
//                     'user-id': id,
//                     'x-access-token': token
//         }
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Ranking por Producto:', data);
//       })
//       .catch(error => console.error('Error en la solicitud:', error));
//   });

//   document.getElementById('rankingServicioButton').addEventListener('click', function() {
    
//     const id = localStorage.getItem('id');
//     const token = localStorage.getItem('token');
    
//     fetch(`http://127.0.0.1:5106/user/${id}/ranking_servicios`,{
//         headers: {
//             'user-id': id,
//             'x-access-token': token
//         }
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Ranking por Servicio:', data);
//       })
//       .catch(error => console.error('Error en la solicitud:', error));
//   });
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

    // Clear the previous content in case there is any
    contenedor1.innerHTML = '';

    // Create a table
    const table = document.createElement('table');
    // Create the table header
    const headerRow = table.insertRow(0);
    Object.keys(data[0]).forEach(key => {
        // Exclude "producto_id" from the table header
        if (key !== "producto_id") {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = key;
        }
    });

    // Loop through the data and create a row for each
    data.forEach(item => {
        const row = table.insertRow();
        Object.keys(item).forEach(key => {
            // Exclude "producto_id" from the table rows
            if (key !== "producto_id") {
                const cell = row.insertCell();
                cell.textContent = item[key];
            }
        });
    });

    // Append the table to the container
    contenedor1.appendChild(table);
}
//*************** */
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

// Obtener el username del localstorage y escribirlo en H1 de la pagina.
const h1Elemento = document.querySelector('.main-header h1');
const username = localStorage.getItem('username');

if (username) {
    h1Elemento.textContent = `Dashboard ${username}`;
} else {
    h1Elemento.textContent = 'Grupo 5 - Proyecto Informatico - UPSO 2023';
}

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

        // Clear the previous content in case there is any
        contenedor1.innerHTML = '';

        // Create a table
        const table = document.createElement('table');

        // Create the table header
        const headerRow = table.insertRow(0);
        const headerApellido = headerRow.insertCell(0);
        const headerNombre = headerRow.insertCell(1);
        const headerCuit = headerRow.insertCell(2);
        const headerAcciones = headerRow.insertCell(3);

        headerApellido.textContent = 'Apellido';
        headerNombre.textContent = 'Nombre';
        headerCuit.textContent = 'CUIT';
        headerAcciones.textContent = 'Acciones';

        // Loop through the clients and create a row for each
        data.clientes.forEach(cliente => {
            const row = table.insertRow();
            const cellApellido = row.insertCell(0);
            const cellNombre = row.insertCell(1);
            const cellCuit = row.insertCell(2);
            const cellAcciones = row.insertCell(3);

            // Original values
            cellApellido.textContent = cliente.apellido;
            cellNombre.textContent = cliente.nombre;
            cellCuit.textContent = cliente.cuit;

            // Input fields for editing
            const inputApellido = document.createElement('input');
            const inputNombre = document.createElement('input');
            const inputCuit = document.createElement('input');

            inputApellido.value = cliente.apellido;
            inputNombre.value = cliente.nombre;
            inputCuit.value = cliente.cuit;

            // Button to start editing
            const btnModificar = document.createElement('button');
            btnModificar.textContent = 'Modificar';
            btnModificar.addEventListener('click', () => {
                // Switch to editing mode
                cellApellido.innerHTML = '';
                cellNombre.innerHTML = '';
                cellCuit.innerHTML = '';

                cellApellido.appendChild(inputApellido);
                cellNombre.appendChild(inputNombre);
                cellCuit.appendChild(inputCuit);

                // Show "Aplicar" button
                cellAcciones.appendChild(btnAplicar);
            });

            // Button to apply changes
            const btnAplicar = document.createElement('button');
            btnAplicar.textContent = 'Aplicar';
            btnAplicar.addEventListener('click', () => {
                // Construct JSON object with updated values
                const updatedData = {
                    nombre: inputNombre.value,
                    apellido: inputApellido.value,
                    cuit: parseInt(inputCuit.value, 10) // Parse cuit as an integer
                };

                // Replace 'urlModificar' with the actual URL for modifying
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

                // Update table cell with new values
                cellApellido.textContent = updatedData.apellido;
                cellNombre.textContent = updatedData.nombre;
                cellCuit.textContent = updatedData.cuit;

                // Remove input fields and "Aplicar" button
                cellAcciones.innerHTML = '';
                cellAcciones.appendChild(btnModificar);

                cargarClientes();

            });

            // Button to delete
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.addEventListener('click', () => {
                // Replace 'urlBorrar' with the actual URL for deleting
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
                    // Reload the container as if "Clientes" button was pressed
                    cargarClientes();
                })
                .catch(error => console.error('Error al Borrar:', error));
            });

            // Append "Modificar" and "Borrar" buttons to the actions cell
            cellAcciones.appendChild(btnModificar);
            cellAcciones.appendChild(btnBorrar);
        });

        // Append the table to the container
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