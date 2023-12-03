document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
    const credentials = btoa(`${username}:${password}`);

    fetch('http://127.0.0.1:5106/login',{
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`
        },        
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.success) {
            localStorage.setItem('id', responseData.id);
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('username', responseData.username);

            window.location.href = 'Index.html';
        } else {
            alert('Error en la autenticación. Verifica tus credenciales.');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});
