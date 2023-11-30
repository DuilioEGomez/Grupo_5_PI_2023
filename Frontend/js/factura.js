

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
        contenedor1.classList.add('facturas');
    })
    .catch(error => console.error('Error en la solicitud:', error));
});

function verDetalle(id_factura) { 

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const columnOrderVerDetalleFacturasP = ['nombre producto', 'precio', 'cantidad'];
    const columnOrderVerDetalleFacturasS = ['nombre servicio', 'precio servicio', 'cantidad']
    fetch(`http://127.0.0.1:5106/user/${id}/factura/${id_factura}`, {
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

    // Verifica si hay productos y los agrega a la tabla
    if (data.productos && data.productos.length > 0) {
        data.productos.forEach(item => {
            const row = table.insertRow();
            columnOrderP.forEach(column => {
                const cell = row.insertCell();
                cell.textContent = item[column];
            });

        });
    }

    // Verifica si hay servicios y los agrega a la tabla
    if (data.servicios && data.servicios.length > 0) {
        data.servicios.forEach(servicio => {
            const row = table.insertRow();
            columnOrderS.forEach(column => {
                const cell = row.insertCell();
                cell.textContent = servicio[column];
            });

        });
    }
    // Agrega la tabla al contenedor
    contenedor1.appendChild(h1_carga);
    contenedor1.appendChild(h3_cliente);
    contenedor1.appendChild(table);
}
