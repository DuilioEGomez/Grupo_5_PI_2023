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
    })
    .catch(error => console.error('Error en la solicitud:', error));
});


  document.getElementById('rankingProductoButton').addEventListener('click', function() {

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:5106/user/${id}/ranking_productos`,{
        headers: {
                    'user-id': id,
                    'x-access-token': token
        }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ranking por Producto:', data);
      })
      .catch(error => console.error('Error en la solicitud:', error));
  });

  document.getElementById('rankingServicioButton').addEventListener('click', function() {
    
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    
    fetch(`http://127.0.0.1:5106/user/${id}/ranking_servicios`,{
        headers: {
            'user-id': id,
            'x-access-token': token
        }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Ranking por Servicio:', data);
      })
      .catch(error => console.error('Error en la solicitud:', error));
  });

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
    })
    .catch(error => console.error('Error en la solicitud:', error));
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