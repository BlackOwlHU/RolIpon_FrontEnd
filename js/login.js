const btnLogin = document.getElementsByClassName('login')[0];
const btnuserNotExist = document.getElementsByClassName('userNotExist')[0];

btnuserNotExist.addEventListener('click', () => {
    window.location.href = '../relog/register.html';
});

btnLogin.addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;

    //console.log(email, password);

    const res = await fetch('http://127.0.0.1:4000/api/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({email, password}),
        credentials: 'include'
    });

    const data = await res.json();
    console.log(data);

    if (res.ok){
        alert(data.message);
        window.location.href = '../../homepage/home.html';
    }else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++){
            errorMessage += `${data.errors[i].error}\n`;
        }
        alert(errorMessage);
    } else if (data.error){
        alert(data.error);
    } else {
        alert('Ismeretlen hiba');
    }
}