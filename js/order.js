import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconHome = document.getElementsByClassName('icon-home')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const menulogo = document.getElementsByClassName('menu-logo')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const setOrder = document.getElementById('orderCheck');

setOrder.addEventListener('click', async () => {
    try {
        const cart_id = await getCartId();
        if (cart_id) {
            await sendOrder(cart_id);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nem található kosár az azonosítóval!",
                draggable: false
            });
        }
    } catch (error) {
        console.error("Hiba történt:", error);
    }
});

async function getCartId() {
    try {
        const res = await fetch('/api/profile/getProfile', {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error("Sikertelen kérés");
        }

        const data = await res.json();
        return data.user_id;
    } catch (error) {
        console.error("Hiba a cart_id lekérésekor:", error);
        return null;
    }
}

async function sendOrder(cart_id) {
    try {
        const firstname = document.getElementById('firstname').value;
        const surname = document.getElementById('surname').value;
        const city = document.getElementById('city').value;
        const address = document.getElementById('address').value;
        const postcode = document.getElementById('postcode').value;
        const tel = document.getElementById('tel').value;
        const email = document.getElementById('email').value;
        //console.log(city, address, postcode, tel);

        const res = await fetch(`/api/order/createOrder/${cart_id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city, address, postcode, tel, firstname, surname, email })
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                title: "Sikeres rendelés!",
                icon: "success",
                draggable: false
            }).then(() => {
                window.location.href = "../homepage/home.html";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Hiba történt: ${data.error}`,
                draggable: false
            });
        }
    } catch (error) {
        console.error("Hiba történt a rendelés elküldésekor:", error);
    }
}

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
}

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

menulogo.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

window.addEventListener('DOMContentLoaded', () => { loadData() });

async function loadData() {
    const res = await fetch('/api/profile/getProfile', {
        method: 'GET',
        credentials: 'include'
    });
    if (!res.ok) {
        console.error("Hiba az API hívásban");
        return;
    }
    const data = await res.json();

    renderCurrentData(data);
}

function renderCurrentData(data) {
    document.getElementById('firstname').value = data.firstname || "";
    document.getElementById('surname').value = data.surname || "";
    document.getElementById('city').value = data.city || "";
    document.getElementById('postcode').value = data.postcode || "";
    document.getElementById('address').value = data.address || "";
    document.getElementById('tel').value = data.tel || "";
    document.getElementById('email').value = data.email || "";
}