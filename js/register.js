import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const btnReg = document.getElementsByClassName('reg')[0];
const btnExist = document.getElementsByClassName('userExist')[0];

btnExist.addEventListener('click', () => {
    window.location.href = '../relog/login.html';
});

btnReg.addEventListener('click', register);

async function register() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('name').value;
    const password = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;

    console.log(email, username, password, psw2);
    if (password != psw2) {
        return alert('A két jelszó nem egyezik!');
    }

    const res = await fetch('http://127.0.0.1:4000/api/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();

    if (res.ok) {
        Swal.fire({
            title: `${data.message}`,
            icon: "success",
            draggable: true
        }).then(() => {
            window.location.href = '../relog/login.html';
        });
    } else if (data.errors) {
        let errorMessage = '';
        for (let i = 0; i < data.errors.length; i++) {
            errorMessage += `${data.errors[i].error}\n`;
        }
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${errorMessage}`,
        });
    } else if (data.error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.error}`,
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ismeretlen hiba",
        });
    }
}