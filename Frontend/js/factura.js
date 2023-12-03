

document.getElementById('verFacturasButton').addEventListener('click', function() {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const columnOrderFacturas = ['apellido', 'nombre', 'cuit', 'fecha_factura', 'id'];

    fetch(`http://127.0.0.1:5106/user/${id}/facturas`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Facturas del Usuario:', data);
        h1_vivo = 'Facturas';
        construirTabla(data["facturas"], columnOrderFacturas, true);
        contenedor1.classList.remove('historial');
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('servicios');
        contenedor1.classList.remove('detalle_factura');
        contenedor1.classList.add('facturas');
    })
    .catch(error => console.error('Error en la solicitud:', error));
});

function verDetalle(id_factura) { 

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const columnOrderVerDetalleFacturasP = ['nombre producto', 'precio', 'cantidad'];
    const columnOrderVerDetalleFacturasS = ['nombre_servicio', 'precio_servicio', 'cantidad']
    fetch(`http://127.0.0.1:5106/user/${id}/factura/${id_factura}`, {
        method: 'GET',
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Facturas del Usuario:', data);
        h1_vivo = 'Detalle Factura';
        construirTablaDetalle(data["detalle factura"], columnOrderVerDetalleFacturasP, columnOrderVerDetalleFacturasS, false);
        contenedor1.classList.remove('historial');
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        contenedor1.classList.remove('productos');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('servicios');
        contenedor1.classList.remove('facturas');
        contenedor1.classList.add('detalle_factura');
    })
    .catch(error => console.error('Error en la solicitud:', error));
};

function construirTablaDetalle(data, columnOrderP, columnOrderS) {

    const contenedor1 = document.getElementById('contenedor1');

    // Limpia el contenedor
    contenedor1.innerHTML = '';
    const h1_carga = document.createElement('h1');
    h1_carga.innerHTML = h1_vivo;
    
    // Eliminar " 00:00:00 GMT" usando una expresión regular
    var fechaSin00GMT = data.cliente['fecha factura'].replace(/\s00:00:00 GMT$/, '');
    var clienteAux = data.cliente['apellido'] + " " + data.cliente['nombre'] + " " +  data.cliente['cuit'] + " " + fechaSin00GMT;
    
    // Crea el H3 para alimentarlo con los datos del cliente
    const h3_cliente = document.createElement('h3');
    h3_cliente.innerHTML = clienteAux;

    // Crea la tabla
    const table = document.createElement('table');

    // Crea la fila de encabezado según el orden deseado
    const headerRow = table.insertRow(0);
    const headerCell = headerRow.insertCell();
    headerCell.textContent = 'Productos & Servicios';

    const P_Sub_Prod = document.createElement('p');
    const P_Sub_Serv = document.createElement('p');
    const P_Total = document.createElement('p');
 
    var parcialMonto = 0;
    var Sub_Prod = 0;
    var Sub_Serv = 0;
    var Total = 0;

    // Verifica si hay productos y los agrega a la tabla
    if (data.productos && data.productos.length > 0) {
        data.productos.forEach(item => {
            parcialMonto = item.precio * item.cantidad
            
            const row = table.insertRow();
            columnOrderP.forEach(column => {
                const cell = row.insertCell();
                cell.textContent = item[column];
            });
            Sub_Prod = Sub_Prod + parcialMonto
        });
    }

    // Verifica si hay servicios y los agrega a la tabla
    if (data.servicios && data.servicios.length > 0) {
        data.servicios.forEach(servicio => {
            parcialMontoS = servicio.precio_servicio * servicio.cantidad
            const row = table.insertRow();
            columnOrderS.forEach(column => {
                const cell = row.insertCell();
                cell.textContent = servicio[column];
            });
            Sub_Serv = Sub_Serv + parcialMontoS
        });
    }
    // Agrega la tabla al contenedor
    P_Sub_Prod.innerHTML = `Subtotal de Productos: ${Sub_Prod}`;
    P_Sub_Serv.innerHTML = `Subtotal de Servicios: ${Sub_Serv}`;
    Total = parseFloat(Sub_Prod + Sub_Serv).toFixed(2)
    P_Total.innerHTML= `Total : ${Total}`;
    contenedor1.appendChild(h1_carga);
    contenedor1.appendChild(h3_cliente);
    contenedor1.appendChild(table);
    contenedor1.appendChild(P_Sub_Prod);
    contenedor1.appendChild(P_Sub_Serv);
    contenedor1.appendChild(P_Total);
}


//////// Crear Factura

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('crearFacturasButton').addEventListener('click', function() {

        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        const contenedor1 = document.getElementById('contenedor1');

        contenedor1.innerHTML = '';
        const h1_crearF = document.createElement('h1');
        h1_crearF.innerHTML = 'Crear Factura';
        const btnConsultaClientes = document.createElement('button');
        btnConsultaClientes.type = 'button';
        btnConsultaClientes.innerHTML = 'Consultar Clientes';

        btnConsultaClientes.addEventListener('click', function() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');

            // Realizar una solicitud al API REST para obtener la lista de clientes

            fetch(`http://127.0.0.1:5106/user/${id}/cliente`, {
                headers: {
                    'user-id': id,
                    'x-access-token': token
                }
                    
        })
            
                .then(response => response.json()                    )
                .then(data => mostrarClientes(data.clientes)
                
                )
            
                .catch(error => console.error('Error al obtener clientes:', error));
        });

        contenedor1.appendChild(h1_crearF);
        contenedor1.appendChild(btnConsultaClientes);
    });

    function mostrarClientes(clientes) {
        const contenedor1 = document.getElementById('contenedor1');
        // Limpiar el contenedor antes de agregar nuevos elementos
        contenedor1.innerHTML = '';

        const h1_crearF = document.createElement('h1');
        h1_crearF.innerHTML = 'Crear Factura';
        contenedor1.appendChild(h1_crearF);

        const contenedorClientes = document.createElement('div');
        contenedorClientes.id = 'contenedorClientes';
        
        // Mostrar la lista de clientes y agregar un botón de selección para cada uno
        clientes.forEach(cliente => {
            const btnSeleccionar = document.createElement('button');
            btnSeleccionar.textContent = `${cliente.nombre} ${cliente.apellido}`;

            btnSeleccionar.addEventListener('click', function() {
                // Capturar el ID del cliente seleccionado
                const idClienteSeleccionado = cliente.id;
                const clienteApellido = cliente.apellido;
                const clienteNombre = cliente.nombre;


                // Utilizar el ID según tus necesidades (puedes guardarlo en localStorage, etc.)
                console.log('ID del cliente seleccionado:', idClienteSeleccionado);
                mostarDetalle(clienteApellido, clienteNombre, idClienteSeleccionado);


            });

            contenedorClientes.appendChild(btnSeleccionar);
            
        });

        contenedor1.appendChild(contenedorClientes);
    
    function mostarDetalle(clienteApellido, clienteNombre, idClienteSeleccionado){
        contenedorClientes.innerHTML = ''
        const h3_feed = document.createElement('h3');
        h3_feed.innerHTML = `Cliente ${clienteApellido} ${clienteNombre}`;
        contenedorClientes.appendChild(h3_feed);

        const btnConsultarProductos = document.createElement('button');
        btnConsultarProductos.type = 'button';
        btnConsultarProductos.innerHTML = 'Productos Disponibles';
        contenedorClientes.appendChild(btnConsultarProductos);
        btnConsultarProductos.addEventListener('click', function() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');

            // Realizar una solicitud al API REST para obtener la lista de clientes

            fetch(`http://127.0.0.1:5106/user/${id}/stock`, {
                headers: {
                    'user-id': id,
                    'x-access-token': token
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('Datos de Productos del usuario X:', data);
   
                altaProductos(idClienteSeleccionado);
                //altaServicio(idClienteSeleccionado);
                //enviarAltaProdServ(idClienteSeleccionado);

                }
            )}
        )

            
    }
    }
});



