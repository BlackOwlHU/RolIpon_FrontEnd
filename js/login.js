import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

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

    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
        if(data.isAdmin === 1){
            Swal.fire({
                title: `${data.message}\n ${data.isAdmin ? 'Admin bejelentkezve' : 'Ön nem admin, de beléphet.'}`,
                icon: "success",
                draggable: false
            }).then(() => {
                window.location.href = '../../admin/admin.html';
            });
        }else{
        Swal.fire({
            title: `${data.message}`,
            icon: "success",
            draggable: false
        }).then(() => {
            window.location.href = '../../homepage/home.html';
        })};
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`;
        }
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errorMessage}`,
            draggable: false
        });
    } else if (data.error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.error}`,
            draggable: false
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ismeretlen hiba",
            draggable: false
        });
    }
}