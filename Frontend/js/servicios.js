//Servicios del usuario X
document.getElementById('serviciosButton').addEventListener('click', function() {
    // Llama a la función para cargar clientes
    cargarServicios();
});

function cargarServicios() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/servicios`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Servicios del usuario X:', data);

        const contenedor1 = document.getElementById('contenedor1');
        contenedor1.classList.remove('historial');
        contenedor1.classList.remove('stock');
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        // // limpiamos el contenedor
        contenedor1.innerHTML = '';
        
        const h1_cabecera = document.createElement('h1')
        h1_cabecera.innerHTML = "Servicios"; 
        contenedor1.appendChild(h1_cabecera);
        inputNombreServicioNuevo.placeholder = 'Nombre Servicio';
        inputPrecioServicioNuevo.placeholder = 'Precio';
        btnCrearServicio.textContent = 'Crear Servicio';
           
        contenedor1.appendChild(inputNombreServicioNuevo);
        contenedor1.appendChild(inputPrecioServicioNuevo);
        contenedor1.appendChild(btnCrearServicio);
    
        //Creamos la tabla
        const table = document.createElement('table');

        
        const headerRow = table.insertRow(0);
        const headerNombre = headerRow.insertCell(0);
        const headerPrecio = headerRow.insertCell(1);
        const headerAcciones = headerRow.insertCell(2);

        
        headerNombre.textContent = 'Nombre Servicio';
        headerPrecio.textContent = 'Precio';
        headerAcciones.textContent = 'Acciones';

        //iteramos en clientes e insertamos los datos
        data.servicios.forEach(servicio => {
            const row = table.insertRow();
            const cellNombre = row.insertCell(0);
            const cellPrecio = row.insertCell(1);
            const cellAcciones = row.insertCell(2);
  
            
            cellNombre.textContent = servicio.nombre_servicio;
            cellPrecio.textContent = servicio.precio;

            // Inputs 
            const inputNombre = document.createElement('input');
            const inputPrecio = document.createElement('input');

            inputNombre.value = servicio.nombre_servicio;
            inputPrecio.value = servicio.precio;

            // boton para empezar a editar
            const btnModificar = document.createElement('button');
            btnModificar.textContent = 'Modificar';
            btnModificar.addEventListener('click', () => {
                // cambiamos a modo editor
                cellNombre.innerHTML = '';
                cellPrecio.innerHTML = '';

                cellNombre.appendChild(inputNombre);
                cellPrecio.appendChild(inputPrecio);

                // mostramos el boton "Aplicar"
                cellAcciones.appendChild(btnAplicar);
            });

            // creamos el boton aplicar
            const btnAplicar = document.createElement('button');
            btnAplicar.textContent = 'Aplicar';
            btnAplicar.addEventListener('click', () => {
                
                const updatedData = {
                    nombre_servicio: inputNombre.value,
                    precio: parseFloat(inputPrecio.value)
                };

                fetch(`http://127.0.0.1:5106/user/${id}/servicios/${servicio.id}`, {
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
                    cargarServicios()
                
                })
                                  
                .catch(error => console.error('Error al Modificar:', error));

                // Actualizamos los campos
                cellNombre.textContent = updatedData.nombre_servicio;
                cellPrecio.textContent = updatedData.precio;

                
                // Quitamos los campos de entrada y el boton "Aplicar"
                cellAcciones.innerHTML = '';
                cellAcciones.appendChild(btnModificar);

                cargarServicios();

            });

            // Boton Borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.addEventListener('click', () => {
                
                fetch(`http://127.0.0.1:5106/user/${id}/servicios/${servicio.id}`, {
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
                    cargarServicios()
                })
                .catch(error => console.error('Error al Borrar:', error));
            });

            // Agregamos botones "Modificar" y "Borrar" 
            cellAcciones.appendChild(btnModificar);
            cellAcciones.appendChild(btnBorrar);
        });
        contenedor1.classList.add('servicios');
        
        contenedor1.appendChild(table);
  
        })      

    .catch(error => console.error('Error en la solicitud:', error));
};


const inputNombreServicioNuevo = document.createElement('input');
const inputPrecioServicioNuevo = document.createElement('input');
const btnCrearServicio = document.createElement('button');

btnCrearServicio.addEventListener('click', function() {

// function crearCliente () {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const nombre = inputNombreServicioNuevo.value;
    const precio = parseFloat(inputPrecioServicioNuevo.value);

    
    const nuevoServicio = {
        "nombre_servicio" : nombre,
        "precio" : precio
    }

    console.log(JSON.stringify(nuevoServicio));
    
        fetch(`http://127.0.0.1:5106/user/${id}/servicios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': id,
                'x-access-token': token
            },
            body: JSON.stringify(nuevoServicio)
         
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from Crear Servicio:', data);
            // Limpiar los campos de entrada después de crear un Servicio
            cargarServicios();
            inputNombreServicioNuevo.value = '';
            inputPrecioServicioNuevo.value = '';
            
            
        })
    .catch(error => console.error('Error al Crear Servicio:', error));
});
