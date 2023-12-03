//Productos del usuario X
document.getElementById('productosButton').addEventListener('click', function() {
    // Llama a la función para cargar clientes
    cargarProductos();
});

function cargarProductos() {
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
        console.log('Datos de Productos del usuario X:', data);

        const contenedor1 = document.getElementById('contenedor1');
        contenedor1.classList.remove('historial');
        contenedor1.classList.remove('stock');
        contenedor1.classList.remove('clientes');
        contenedor1.classList.remove('servicios');
        contenedor1.classList.remove('ranking_productos');
        contenedor1.classList.remove('ranking_servicios');
        contenedor1.classList.remove('ranking_clientes');
        // // limpiamos el contenedor
        contenedor1.innerHTML = '';
        
        const h1_cabecera = document.createElement('h1')
        h1_cabecera.innerHTML = "Productos"; 
        contenedor1.appendChild(h1_cabecera);
        inputNombreProductoNuevo.placeholder = 'Nombre Producto';
        inputPrecioNuevo.placeholder = 'Precio';
        inputProveedorNuevo.placeholder = 'Proveedor';
        inputProveedorEmailNuevo.placeholder = 'Proveedor Email';
        inputStockNuevo.placeholder = 'Stock';
        inputAlertaStockNuevo.placeholder = 'Alerta Stock';
        btnCrearProducto.textContent = 'Crear Producto';
           
        contenedor1.appendChild(inputNombreProductoNuevo);
        contenedor1.appendChild(inputPrecioNuevo);
        contenedor1.appendChild(inputProveedorNuevo);
        contenedor1.appendChild(inputProveedorEmailNuevo)
        contenedor1.appendChild(inputStockNuevo);
        contenedor1.appendChild(inputAlertaStockNuevo);
        contenedor1.appendChild(btnCrearProducto);
    
        //Creamos la tabla
        const table = document.createElement('table');

        
        const headerRow = table.insertRow(0);
        const headerNombreProducto = headerRow.insertCell(0);
        const headerPrecio = headerRow.insertCell(1);
        const headerProveedor = headerRow.insertCell(2);
        const headerProveedorEmail = headerRow.insertCell(3);
        const headerStock = headerRow.insertCell(4);
        const headerAlertaStock = headerRow.insertCell(5);
        const headerAcciones = headerRow.insertCell(6);

        headerNombreProducto.textContent = 'Nombre Producto';
        headerPrecio.textContent = 'Precio';
        headerProveedor.textContent = 'Proveedor';
        headerProveedorEmail.textContent = 'Proveedor Email';
        headerStock.textContent = 'Stock';
        headerAlertaStock.textContent = 'Alerta Stock';
        headerAcciones.textContent = 'Acciones';

        
        data.stock.forEach(producto => {
            const row = table.insertRow();
            const cellNombreProducto = row.insertCell(0);
            const cellPrecio = row.insertCell(1);
            const cellProveedor = row.insertCell(2);
            const cellProveedorEmail = row.insertCell(3);
            const cellStock = row.insertCell(4);
            const cellAlertaStock = row.insertCell(5);
            const cellAcciones = row.insertCell(6);
  
            cellNombreProducto.textContent = producto.nombre_producto;
            cellPrecio.textContent = producto.precio;
            cellProveedor.textContent = producto.proveedor;
            cellProveedorEmail.textContent = producto.proveedor_email;
            cellStock.textContent = producto.stock_disponible;
            cellAlertaStock.textContent = producto.alerta_stock;

            // Inputs 
            const inputNombreProducto = document.createElement('input');
            const inputPrecio = document.createElement('input');
            const inputProveedor = document.createElement('input');
            const inputProveedorEmail = document.createElement('input');
            const inputStock = document.createElement('input');
            const inputAlertaStock = document.createElement('input');

            inputNombreProducto.value = producto.nombre_producto;
            inputPrecio.value = producto.precio;
            inputProveedor.value = producto.proveedor;
            inputProveedorEmail.value = producto.proveedor_email;
            inputStock.value = producto.stock_disponible;
            inputAlertaStock.value = producto.alerta_stock;

            // boton para empezar a editar
            const btnModificar = document.createElement('button');
            btnModificar.textContent = 'Modificar';
            btnModificar.addEventListener('click', () => {
                // cambiamos a modo editor
                cellNombreProducto.textContent = '';
                cellPrecio.textContent = '';
                cellProveedor.textContent = '';
                cellProveedorEmail.textContent = '';
                cellStock.textContent = '';
                cellAlertaStock.textContent = '';

                cellNombreProducto.appendChild(inputNombreProducto);
                cellPrecio.appendChild(inputPrecio);
                cellProveedor.appendChild(inputProveedor);
                cellProveedorEmail.appendChild(inputProveedorEmail);
                cellStock.appendChild(inputStock);
                cellAlertaStock.appendChild(inputAlertaStock);

                // mostramos el boton "Aplicar"
                cellAcciones.appendChild(btnAplicar);
            });

            // creamos el boton aplicar
            const btnAplicar = document.createElement('button');
            btnAplicar.textContent = 'Aplicar';
            btnAplicar.addEventListener('click', () => {
                
                const updatedDataP = {
                    nombre_producto: inputNombreProducto.value,
                    precio: parseFloat(inputPrecio.value),
                    proveedor: inputProveedor.value,
                    proveedor_email: inputProveedorEmail.value,
                    stock_disponible: parseInt(inputStock.value, 10),
                    alerta_stock: parseInt(inputAlertaStock.value, 10),
                };

                fetch(`http://127.0.0.1:5106/user/${id}/producto/${producto.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': id,
                        'x-access-token': token
                    },
                    body: JSON.stringify(updatedDataP)
                })
                .then(response => response.json())
                .then(data => {
                    console.log("producto ID: ", id);
                    console.log('Response from Modificar:', data);
                    cargarProductos()
                
                })
                                  
                .catch(error => console.error('Error al Modificar:', error));

                // Actualizamos los campos
                cellNombreProducto.textContent = updatedDataP.nombre_producto;
                cellPrecio.textContent = updatedDataP.precio;
                cellProveedor.textContent = updatedDataP.proveedor;
                cellProveedorEmail.textContent = updatedDataP.proveedor_email;
                cellStock.textContent = updatedDataP.stock_disponible;
                cellAlertaStock.textContent = updatedDataP.alerta_stock;
                                
                // Quitamos los campos de entrada y el boton "Aplicar"
                cellAcciones.innerHTML = '';
                cellAcciones.appendChild(btnModificar);

                cargarProductos();

            });

            // Boton Borrar
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Borrar';
            btnBorrar.addEventListener('click', () => {
                
                fetch(`http://127.0.0.1:5106/user/${id}/producto/${producto.id}`, {
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
                    cargarProductos();
                })
                .catch(error => console.error('Error al Borrar:', error));
            });

            // Agregamos botones "Modificar" y "Borrar" 
            cellAcciones.appendChild(btnModificar);
            cellAcciones.appendChild(btnBorrar);
        });
        contenedor1.classList.add('productos');
        
        contenedor1.appendChild(table);
  
        })      

    .catch(error => console.error('Error en la solicitud:', error));
};


const inputNombreProductoNuevo = document.createElement('input');
const inputPrecioNuevo = document.createElement('input');
const inputProveedorNuevo = document.createElement('input');
const inputProveedorEmailNuevo = document.createElement('input');
const inputStockNuevo = document.createElement('input');
const inputAlertaStockNuevo = document.createElement('input');

const btnCrearProducto = document.createElement('button');

btnCrearProducto.addEventListener('click', function() {

// function crearProducto () {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    //const precioString = inputPrecioNuevo.value;
    //let precioEditado = precioString;
    //if (Number.isInteger(precioEditado)) {
        // Agrega los ceros decimales manualmente
      //  precioEditado = parseFloat(precioEditado.toFixed(2));
      //}    

    //console.log("precio editado", precioEditado);
    const nuevoProducto = {
        "id_usuario" : parseInt(id,10),
        "nombre_producto" : inputNombreProductoNuevo.value,
        "stock_disponible" : parseInt(inputStockNuevo.value,10),
        "precio" : parseFloat(parseFloat(inputPrecioNuevo.value).toFixed(2)),
        //"precio" : precioEditado,
        "proveedor" : inputProveedorNuevo.value,
        "proveedor_email" : inputProveedorEmailNuevo.value,
        "alerta_stock" : parseInt(inputAlertaStockNuevo.value,10)
    }

    console.log(JSON.stringify(nuevoProducto));
    
        fetch(`http://127.0.0.1:5106/user/${id}/producto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'user-id': id,
                'x-access-token': token
            },
            body: JSON.stringify(nuevoProducto)
         
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from Crear Producto:', data);
            // Limpiar los campos de entrada después de crear un producto
            cargarProductos();
            inputNombreNuevo.value = '';
            inputApellidoNuevo.value = '';
            inputCuitNuevo.value = '';

            inputNombreProductoNuevo.value = '';
            inputPrecioNuevo.value = '';
            inputProveedorNuevo.value = '';
            inputProveedorEmailNuevo.value = '';
            inputStockNuevo.value = '';
            inputAlertaStockNuevo.value = '';
            // Recargar la lista de Productos
            
        })
    .catch(error => console.error('Error al Crear Producto:', error));
});

