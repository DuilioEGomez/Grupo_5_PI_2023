function altaProductos(idClienteSeleccionado) {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    var listaProd = [];
    var altaParcialProd = {}
    
    

    fetch(`http://127.0.0.1:5106/user/${id}/stock`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Productos del usuario X:', data);

        contenedorClientes.innerHTML = '';
        
        const h4_altaProd = document.createElement('h4');
        h4_altaProd.innerHTML = "Productos"; 
        contenedorClientes.appendChild(h4_altaProd);

        //Creamos la tabla
        const table = document.createElement('table');

        const headerRow = table.insertRow(0);
        const headerNombreProducto = headerRow.insertCell(0);
        const headerPrecio = headerRow.insertCell(1);
        const headerProveedor = headerRow.insertCell(2);
        const headerStock = headerRow.insertCell(3);
        const headerCantidad = headerRow.insertCell(4);

        headerNombreProducto.textContent = 'Nombre Producto';
        headerPrecio.textContent = 'Precio';
        headerProveedor.textContent = 'Proveedor';
        headerStock.textContent = 'Stock';
        headerCantidad.textContent = 'Cantidad';

        data.stock.forEach(producto => {
            const row = table.insertRow();
            const cellNombreProducto = row.insertCell(0);
            const cellPrecio = row.insertCell(1);
            const cellProveedor = row.insertCell(2);
            const cellStock = row.insertCell(3);
            const cellCantidad = row.insertCell(4);
            const cellAcciones = row.insertCell(5);
        
            cellNombreProducto.textContent = producto.nombre_producto;
            cellPrecio.textContent = producto.precio;
            cellProveedor.textContent = producto.proveedor;
            cellStock.textContent = producto.stock_disponible;
            cellCantidad.textContent = '##';
        
            // Inputs 
            const inputNombreProducto = document.createElement('input');
            const inputPrecio = document.createElement('input');
            const inputProveedor = document.createElement('input');
            const inputStock = document.createElement('input');
            const inputCantidad = document.createElement('input');
        
            inputNombreProducto.value = producto.nombre_producto;
            inputPrecio.value = producto.precio;
            inputProveedor.value = producto.proveedor;
            inputStock.value = producto.stock_disponible;
            inputCantidad.value = '';
        
            // Almacena los valores originales
            const originalValues = {
                cantidad: producto.stock_disponible,
                precio: producto.precio
            };
        
            // Estado de edición
            let isEditing = false;
        
            // Botón para empezar a editar
            const btnAgregar = document.createElement('button');
            btnAgregar.textContent = 'Agregar';
            btnAgregar.addEventListener('click', () => {
                if (!isEditing) {
                    // Cambiamos a modo editor solo si no estamos editando actualmente
                    cellCantidad.innerHTML = '';
                    cellPrecio.innerHTML = '';
        
                    // Mostramos el input de cantidad
                    const cantidadInput = document.createElement('input');
                    cantidadInput.type = 'number';
                    cantidadInput.value = '1'; //originalValues.cantidad;
                    cellCantidad.appendChild(cantidadInput);
        
                    // Mostramos el input de precio
                    const precioInput = document.createElement('input');
                    precioInput.type = 'number';
                    precioInput.value = originalValues.precio;
                    cellPrecio.appendChild(precioInput);
        
                    // Mostramos los botones "Aplicar" y "Cancelar"
                    const btnAplicar = document.createElement('button');
                    btnAplicar.textContent = 'Aplicar';
                    btnAplicar.addEventListener('click', () => {
                        const cantidad = cantidadInput.value;
                        const precio = precioInput.value;

                        altaParcialProd = {"id_producto" : producto.id, "cantidad": parseInt(cantidad), "precio_producto": parseFloat(producto.precio)};
                        listaProd.push(altaParcialProd);
                        
                        //var jsonAltaProd = {"alta productos" : altaParcial};

                        console.log("JSON parcial de alta Producto: ", listaProd);
        
                        // Actualizamos las celdas de cantidad y precio
                        cellCantidad.textContent = cantidad;
                        cellPrecio.textContent = precio;
        
                        // Restauramos el botón "Agregar"
                        cellAcciones.innerHTML = '';
                        cellAcciones.appendChild(btnAgregar);
        
                        // Restablecemos el estado de edición
                        isEditing = false;
                    });
        
                    const btnCancelar = document.createElement('button');
                    btnCancelar.textContent = 'Cancelar';
                    btnCancelar.addEventListener('click', () => {
                        // Restauramos los valores originales
                        cantidadInput.value = originalValues.cantidad;
                        precioInput.value = originalValues.precio;
        
                        // Restauramos el botón "Agregar"
                        cellAcciones.innerHTML = '';
                        cellAcciones.appendChild(btnAgregar);
        
                        // Restablecemos el estado de edición
                        isEditing = false;
                    });
        
                    cellAcciones.appendChild(btnAplicar);
                    cellAcciones.appendChild(btnCancelar);
        
                    // Cambiamos el estado de edición
                    isEditing = true;
                }
            });
        
            // Agregamos botones "Agregar Cantidad"
            cellAcciones.appendChild(btnAgregar);
        });

        contenedorClientes.classList.add('contenedorClientes');
        contenedorClientes.appendChild(table);
        const btnEnviarJsonP = document.createElement('button');
        btnEnviarJsonP.textContent = 'Carga de Productos Seleccionados';
        contenedorClientes.appendChild(btnEnviarJsonP);
            btnEnviarJsonP.addEventListener('click', () => {
        
                console.log('ENVIANDO JSON');       
                console.log('JSON Productos : ',listaProd);

                const jsonAltaProd = {"alta productos" : listaProd};
                console.log("JSON A SUBIR ALTA PRODUCTO ",jsonAltaProd);
                console.log("ID cliente = ", idClienteSeleccionado);
                console.log("ID Usuario = ", id);
                
                altaServicio(idClienteSeleccionado, jsonAltaProd);
                //
            });
                
           //  });
        
    })
   
    .catch(error => console.error('Error en la solicitud:', error));
}



// //)}
function altaProdFact(id_fact, jsonAltaProd){
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    console.log("lo que llega id_fact= ", id_fact, " JSON alta prod", jsonAltaProd);
    fetch(`http://127.0.0.1:5106/user/${id}/factura/${id_fact}/factura_productos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': id,
                        'x-access-token': token
                    },
                    body: JSON.stringify(jsonAltaProd)
                 
            })
                .then(response => response.json())
                .then(data => {
                    console.log(`Response from Cargar Productos a la Factura ${id_fact}:`, data);

                    
                    
                })
            .catch(error => console.error('Error al Crear Factura:', error));
}

function altaFacturaNueva(idClienteSeleccionado) {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
    var day = ("0" + fechaActual.getDate()).slice(-2);
    var fechaFormateada = year + "-" + month + "-" + day;
    var fechaAlta = fechaFormateada;

    const jsonAltaFactura = {
        "id_usuario": id,
        "id_cliente": idClienteSeleccionado,
        "fecha_factura": fechaAlta
    };

    return fetch(`http://127.0.0.1:5106/user/${id}/factura`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-id': id,
            'x-access-token': token
        },
        body: JSON.stringify(jsonAltaFactura)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al crear factura: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Response from Crear Factura:', data);
        console.log("ID Factura Nueva = ", data.id);
        return data.id;
    })
    .catch(error => {
        console.error('Error al Crear Factura:', error);
        throw error; // Propagar el error para que puedas manejarlo donde llames a esta función
    });
}



///////// SECCION SERVICIOS

function altaServicio(idClienteSeleccionado, jsonAltaProd) {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    var altaParcialServ = {}
    var listaServ = [];

    fetch(`http://127.0.0.1:5106/user/${id}/servicios`, {
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de Servicios del usuario X:', data);
        
        const h4_altaServ = document.createElement('h4');
        h4_altaServ.innerHTML = "Servicios"; 
        contenedorClientes.appendChild(h4_altaServ);

        //Creamos la tabla
        const table = document.createElement('table');

        const headerRow = table.insertRow(0);
        const headerNombreServicio = headerRow.insertCell(0);
        const headerPrecio = headerRow.insertCell(1); 
        const headerCantidad = headerRow.insertCell(2); 
        
        headerNombreServicio.textContent = 'Nombre Servicio';
        headerPrecio.textContent = 'Precio';
        headerCantidad.textContent = 'Cantidad';
        
        data.servicios.forEach(servicio => {
            const row = table.insertRow();
            const cellNombreServicio = row.insertCell(0);
            const cellPrecio = row.insertCell(1);
            const cellCantidad = row.insertCell(2);
            const cellAcciones = row.insertCell(3);
        
            cellNombreServicio.textContent = servicio.nombre_servicio;
            cellPrecio.textContent = servicio.precio;
            cellCantidad.textContent = '##';
        
            // Inputs 
            const inputNombreServicio = document.createElement('input');
            const inputPrecio = document.createElement('input');
            const inputCantidad = document.createElement('input');
            
            inputNombreServicio.value = servicio.nombre_servicio;
            inputPrecio.value = servicio.precio;            
            inputCantidad.value = '';
        
            // Almacena los valores originales
            const originalValues = {
                cantidad: '1',
                precio: servicio.precio
            };
        
            // Estado de edición
            let isEditing = false;
        
            // Botón para empezar a editar
            const btnAgregar = document.createElement('button');
            btnAgregar.textContent = 'Agregar';
            btnAgregar.addEventListener('click', () => {
                if (!isEditing) {
                    // Cambiamos a modo editor solo si no estamos editando actualmente
                    cellCantidad.innerHTML = '';
                    cellPrecio.innerHTML = '';
        
                    // Mostramos el input de cantidad
                    const cantidadInput = document.createElement('input');
                    cantidadInput.type = 'number';
                    cantidadInput.value = originalValues.cantidad;
                    cellCantidad.appendChild(cantidadInput);
        
                    // Mostramos el input de precio
                    const precioInput = document.createElement('input');
                    precioInput.type = 'number';
                    precioInput.value = originalValues.precio;
                    cellPrecio.appendChild(precioInput);
        
                    // Mostramos los botones "Aplicar" y "Cancelar"
                    const btnAplicar = document.createElement('button');
                    btnAplicar.textContent = 'Aplicar';
                    btnAplicar.addEventListener('click', () => {
                        const cantidad = cantidadInput.value;
                        const precio = precioInput.value;

                        altaParcialServ = {"id_servicio" : servicio.id, "cantidad": parseInt(cantidad), "precio_servicio": parseFloat(servicio.precio)};                        
                        listaServ.push(altaParcialServ);
                        //var jsonAltaSer = {"alta productos" : altaParcialServ};
                        console.log("JSON parcial de alta Servicio: ", listaServ);
                        // Actualizamos las celdas de cantidad y precio
                        cellCantidad.textContent = cantidad;
                        cellPrecio.textContent = precio;
        
                        // Restauramos el botón "Agregar"
                        cellAcciones.innerHTML = '';
                        cellAcciones.appendChild(btnAgregar);
        
                        // Restablecemos el estado de edición
                        isEditing = false;
                    });
        
                    const btnCancelar = document.createElement('button');
                    btnCancelar.textContent = 'Cancelar';
                    btnCancelar.addEventListener('click', () => {
                        // Restauramos los valores originales
                        cantidadInput.value = originalValues.cantidad;
                        precioInput.value = originalValues.precio;
        
                        // Restauramos el botón "Agregar"
                        cellAcciones.innerHTML = '';
                        cellAcciones.appendChild(btnAgregar);
        
                        // Restablecemos el estado de edición
                        isEditing = false;
                    });
        
                    cellAcciones.appendChild(btnAplicar);
                    cellAcciones.appendChild(btnCancelar);
        
                    // Cambiamos el estado de edición
                    isEditing = true;
                }
            });
        
            // Agregamos botones "Agregar Cantidad"
            cellAcciones.appendChild(btnAgregar);
        });

        contenedorClientes.classList.add('contenedorClientes');
        contenedorClientes.appendChild(table);
        const btnEnviarJsonS = document.createElement('button');
        btnEnviarJsonS.textContent = 'Carga de Servicios Seleccionados';
        contenedorClientes.appendChild(btnEnviarJsonS);
            btnEnviarJsonS.addEventListener('click', () => {
        
                console.log('ENVIANDO JSON');       
                console.log('JSON Servicios : ',listaServ);

                const jsonAltaServ = {"alta servicios" : listaServ};
                console.log("JSON A SUBIR ALTA Servicio ",jsonAltaServ);
                console.log("ID cliente = ", idClienteSeleccionado);
                console.log("ID Usuario = ", id);
                
                
                const btnEnviarTodo = document.createElement('button');
                btnEnviarTodo.textContent = 'Crear la Factura';
                contenedorClientes.appendChild(btnEnviarTodo);
                btnEnviarTodo.addEventListener('click', () => {

                    altaFacturaNueva(idClienteSeleccionado)
                        .then(idFactura =>{
                            console.log("Factura Actual ID = ", idFactura, jsonAltaProd, jsonAltaServ);
                            altaProdFact(idFactura, jsonAltaProd);
                            altaServFact(idFactura, jsonAltaServ);
                            const H2_SuccessFact = document.createElement('h2');
                            H2_SuccessFact.innerHTML = `La factura ${idFactura} Fue creada con Exito`;                            
                        
                            contenedorClientes.innerHTML = '';
                            contenedorClientes.appendChild(H2_SuccessFact);
                            // contenedorClientes.appendChild(P_Sub_Prod);
                            // contenedorClientes.appendChild(P_Sub_Serv);
                        })
                        .catch(error => {
                            console.log("Error obteniendo la ID de la Factura", error);
                        });
                        
                })
            })

    })
        
    .catch(error => console.error('Error en la solicitud:', error));
};


function altaServFact(id_fact, jsonAltaServ){
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/factura/${id_fact}/factura_servicios`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': id,
                        'x-access-token': token
                    },
                    body: JSON.stringify(jsonAltaServ)
                 
            })
                .then(response => response.json())
                .then(data => {
                    console.log(`Response from Cargar Servicios a la Factura ${id_fact}:`, data);

                    
                    
                })
            .catch(error => console.error('Error al Crear Factura Servicio:', error));
}

function montoSubTotalProd(id_fact){
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    return fetch(`http://127.0.0.1:5106/user/${id}/factura_productos/${id_fact}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': id,
                        'x-access-token': token
                    }
                    
                 
            })
                .then(response => response.json())
                .then(data => {
                    console.log(`Subtotal Productos de la Factura ${id_fact}:`, data);
                    return data                    
                })
            .catch(error => console.error('Error en la solicitud:', error));
}

function montoSubTotalServ(id_fact){
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/factura_sericios/${id_fact}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'user-id': id,
                        'x-access-token': token
                    }
                    
                 
            })
                .then(response => response.json())
                .then(data => {
                    console.log(`Subtotal Servicios de la Factura ${id_fact}:`, data);
                    return data                    
                })
            .catch(error => console.error('Error en la solicitud:', error));
}