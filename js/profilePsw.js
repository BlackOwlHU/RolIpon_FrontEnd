import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconUser = document.getElementsByClassName('icon-user')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnSave = document.getElementById('PswSave');
const menulogo = document.getElementsByClassName('menu-logo')[0]
const cart = document.getElementsByClassName('cart')[0];

cart.addEventListener('click', () => {
    window.location.href = "../cart/cart.html";
});

btnSave.addEventListener('click', editProfilePsw);

async function editProfilePsw() {
    const oldPassword = document.getElementById('oldpsw').value;
    const psw = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;
    if (psw === psw2) {
        const res = await fetch('/api/profile/editPassword', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword: psw })
        });
        const data = await res.json();
        if (res.ok) {
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
                draggable: false
            }).then(() => {
                logout();
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${data.error}`,
                draggable: false
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "A két jelszó nem egyezik",
            draggable: false
        });
    };
};

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html'
});

iconLogout.addEventListener('click', logout);

async function logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if (res.ok) {
        window.location.href = "../index.html";
    } else {
        alert('Hiba kijelentkezéskor');
    }
};
menulogo.addEventListener('click', () => {
    window.location.href = '../homepage/home.html'
})