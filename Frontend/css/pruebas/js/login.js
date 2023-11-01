window.onload = function(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
}
function LoginIn(){
    document.getElementById("message").innerHTML = '';
    const username = document.getElementById('in-username').value;
    const password = document.getElementById('in-password').value;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(username + ":" + password)
        }    
    }
    fetch('http://127.0.0.1:5000/login', requestOptions)
    .then(
        res => {return res.json()}
    )
    .then(
        resp => {
            console.log(resp)
            if (resp.token){
                localStorage.setItem('token', resp.token);
                localStorage.setItem('username', resp.username);
                localStorage.setItem('id', resp.id);
                document.getElementById("message").innerHTML = 'Bienvenido '+ resp.username;
            }
            else{
                document.getElementById("message").innerHTML = resp.message
            }
        }
    )
}