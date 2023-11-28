// Obtener el username del localstorage y escribirlo en H1 de la pagina.
const h1Elemento = document.querySelector('.main-header h1');
const username = localStorage.getItem('username');

var h1_vivo = '';
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
        h1_vivo = 'Stock';
        construirTabla(data["stock"]);
        contenedor1.classList.remove('historial');
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        contenedor1.classList.add('stock');
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('servicios');
        
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
            h1_vivo = 'Ranking por Productos';
            construirTabla(data["ranking productos"]);

            contenedor1.classList.remove('historial');
            contenedor1.classList.remove('stock');
            contenedor1.classList.remove('ranking_servicios');
            contenedor1.classList.remove('ranking_clientes');
            contenedor1.classList.add('ranking_productos');
            contenedor1.classList.remove('productos');
            contenedor1.classList.remove('clientes');
            contenedor1.classList.remove('servicios');
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
            h1_vivo = 'Ranking por Servicios';
            construirTabla(data["ranking servicios"]);
            contenedor1.classList.remove('historial');
            contenedor1.classList.remove('stock');
            contenedor1.classList.remove('ranking_productos');
            contenedor1.classList.remove('ranking_clientes');
            contenedor1.classList.add('ranking_servicios');
            contenedor1.classList.remove('productos');
            contenedor1.classList.remove('clientes');
            contenedor1.classList.remove('servicios');

            
        })
        .catch(error => console.error('Error en la solicitud:', error));
});

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

        h1_vivo = 'Ranking Clientes';
        construirTabla(data["ranking clientes"]);
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('stock');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.add('ranking_clientes');
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('servicios');

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

        h1_vivo = 'Historial';
        construirTabla(data["historial"]);
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('stock');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        contenedor1.classList.add('historial');
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('servicios');

        
      })
      .catch(error => console.error('Error en la solicitud:', error));
  });


function construirTabla(data) {
    const contenedor1 = document.getElementById('contenedor1');

    // Limpia el contenedor
    contenedor1.innerHTML = '';
    const h1_carga = document.createElement('h1');
    h1_carga.innerHTML = h1_vivo;
    
    

    // Crea la tabla
    const table = document.createElement('table');
    // Lista de claves a excluir del objeto data
    const excludedKeys = ["id", "id_usuario", "id_servicio"];

    const headerRow = table.insertRow(0);
    Object.keys(data[0]).forEach(key => {
        if (!excludedKeys.includes(key)) {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = key;
        }
    });

    // Itera en data y va creando la tabla
    data.forEach(item => {
        const row = table.insertRow();
        Object.keys(item).forEach(key => { 
            if (!excludedKeys.includes(key)) {
                const cell = row.insertCell();
                cell.textContent = item[key];
            }
        });
    });

    // Agrega la tabla al contenedor

    contenedor1.appendChild(h1_carga);
    contenedor1.appendChild(table);
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
        contenedor1.classList.remove('historial');
        contenedor1.classList.remove('stock');
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('servicios');
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        // // limpiamos el contenedor
        contenedor1.innerHTML = '';
        
        const h1_cabecera = document.createElement('h1')
        h1_cabecera.innerHTML = "Clientes"; 
        contenedor1.appendChild(h1_cabecera);
        inputNombreNuevo.placeholder = 'Nombre';
        inputApellidoNuevo.placeholder = 'Apellido';
        inputCuitNuevo.placeholder = 'CUIT';
        btnCrearCliente.textContent = 'Crear Cliente';
           
        contenedor1.appendChild(inputNombreNuevo);
        contenedor1.appendChild(inputApellidoNuevo);
        contenedor1.appendChild(inputCuitNuevo);
        contenedor1.appendChild(btnCrearCliente);
    
        //Creamos la tabla
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

        //iteramos en clientes e insertamos los datos
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
                .then(data => {
                    console.log('Response from Modificar:', data)
                    cargarClientes()
                
                })
                                  
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
        contenedor1.classList.add('clientes');
        
        contenedor1.appendChild(table);
  
        })      

    .catch(error => console.error('Error en la solicitud:', error));
};


const inputNombreNuevo = document.createElement('input');
const inputApellidoNuevo = document.createElement('input');
const inputCuitNuevo = document.createElement('input');
const btnCrearCliente = document.createElement('button');

btnCrearCliente.addEventListener('click', function() {

// function crearCliente () {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const nombre = inputNombreNuevo.value;
    const apellido = inputApellidoNuevo.value;
    const cuit = parseInt(inputCuitNuevo.value,10);

    
    const nuevoCliente = {
        "nombre" : nombre,
        "apellido": apellido,
        "cuit": cuit
    }

    console.log(JSON.stringify(nuevoCliente));
    
        fetch(`http://127.0.0.1:5106/user/${id}/cliente`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': id,
                'x-access-token': token
            },
            body: JSON.stringify(nuevoCliente)
         
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from Crear Cliente:', data);
            // Limpiar los campos de entrada después de crear un cliente
            cargarClientes();
            inputNombreNuevo.value = '';
            inputApellidoNuevo.value = '';
            inputCuitNuevo.value = '';
            // Recargar la lista de clientes
            
        })
    .catch(error => console.error('Error al Crear Cliente:', error));
});


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