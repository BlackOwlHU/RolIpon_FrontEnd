import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const menulogo = document.getElementsByClassName('menu-logo')[0];
const cartDiv = document.getElementsByClassName('cart-container')[0];

var vegosszeg = 0;

window.addEventListener('DOMContentLoaded', cartItems);

async function cartItems() {
    const res = await fetch('/api/cart/cart', {
        method: 'GET',
        credentials: 'include'
    });

    const cartData = await res.json();
    if (res.ok) {
        renderCart(cartData);
    }
    else {
        cartIsEmpty();
    }
}

function cartIsEmpty() {
    cartDiv.innerHTML = '';
    cartDiv.innerHTML = `<h2>Kosár</h2>
        <div class="cart-item">
            <img src="" alt="">
            <span></span>
            <span></span>
        </div>
        <div class="cart-summary">
            <h3>Összesen: 0 Ft</h3>
            <a href="../homepage/home.html" class="back-to-btn">Vissza vásárláshoz</a>
        </div>`;
}

function renderCart(cartData) {
    cartDiv.innerHTML = '';
    vegosszeg = parseFloat(0);
    cartDiv.innerHTML += `<h2>Kosár</h2>`;
    
    // A kosárban lévő elemek törlésének eseménykezelése
    cartData.forEach(item => {
        vegosszeg += parseFloat(item.total_price);
        cartDiv.innerHTML += `
            <div class="cart-item">
                <img src="/uploads/${item.image}" alt="/uploads/${item.image}">
                <span>${item.product_name}</span>
                <div class="quantity">
                    <button class="quantityMinus" onclick="quantity(event, ${item.cart_items_id}, -1)">-</button>
                    <input value="${item.quantity}" min="1" max="1000">
                    <button class="quantityPlus" onclick="quantity(event, ${item.cart_items_id}, 1)">+</button>
                </div>
                <span>${item.total_price}</span>
                <i class="fa-solid fa-trash trash" data-cart-id="${item.cart_items_id}"></i>
            </div>
        `;
    });
    cartDiv.innerHTML += `<div class="cart-summary">
            <h3>Összesen: ${vegosszeg} Ft</h3>
            <a href="#" class="checkout-btn">Tovább a pénztárhoz</a>
        </div>`;
    
    // Ellenőrizd, hogy van-e checkout gomb, mielőtt hozzáadod az eseménykezelőt
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            checkout();
        });
    }

    // A törlés gomb eseménykezelése
    document.querySelectorAll('.trash').forEach(trashIcon => {
        trashIcon.addEventListener('click', (event) => {
            const cartItemId = event.target.getAttribute('data-cart-id');
            deleteFromCart(cartItemId);
        });
    });
}

// Globálissá tesszük a függvényeket
window.deleteFromCart = async function(cart_items_id) {
    const res = await fetch(`/api/cart/removeCart/${cart_items_id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
        Swal.fire({
            title: "Sikeres törlés!",
            icon: "success",
            draggable: false
        });
        cartItems();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Hiba törléskor,${data.error}`,
            draggable: false
        });
    }
}

menulogo.addEventListener('click', () => {
    window.location.href = '../homepage/home.html'
})

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

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

window.checkout = function() {
    window.location.href = '../cart/order.html';
}

window.quantity = function(event, cart_items_id, vonas) {
    const quantityInput = event.target.closest('.quantity').querySelector('input');
    let quantityValue = parseInt(quantityInput.value);
    let min = 1;
    quantityValue += vonas;
    quantityInput.value = quantityValue;
    if (quantityValue < min) {
        quantityInput.value = min;
    }
    priceRefresh(cart_items_id, quantityInput.value);
}

async function priceRefresh(cart_items_id, quantity) {
    const res = await fetch(`/api/cart/putQuantity/${cart_items_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
    });

    if (res.ok) {
        cartItems();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hiba a módosításkor",
            draggable: false
        });
    }
}