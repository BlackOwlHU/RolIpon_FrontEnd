const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const menulogo = document.getElementsByClassName ('menu-logo')[0];
const cartDiv = document.getElementsByClassName('cart-container')[0];

var vegosszeg = 0;

window.addEventListener('DOMContentLoaded', cartItems);

async function cartItems() {
    const res = await fetch('http://127.0.0.1:4000/api/cart/cart', {
        method: 'GET',
        credentials: 'include'
    });

    const cartData = await res.json();
    if(res.ok){
        renderCart(cartData);
    }
    else{
        cartIsEmpty();
    }
}

function cartIsEmpty(){
    cartDiv.innerHTML = '';
    cartDiv.innerHTML = `<h2>Kosár</h2>
        <div class="cart-item">
            <img src="" alt="">
            <span></span>
            <span></span>
        </div><div class="cart-summary">
            <h3>Összesen: 0 Ft</h3>
            <a href="#" class="back-to-btn">Vissza vásárláshoz</a>
        </div>`;
}

function renderCart(cartData){
    cartDiv.innerHTML = '';
    vegosszeg = parseFloat(0);
    cartDiv.innerHTML += `<h2>Kosár</h2>`;
    cartData.forEach(item => {
        vegosszeg += parseFloat(item.total_price);
        cartDiv.innerHTML += `<div class="cart-item">
            <img src="http://127.0.0.1:4000/uploads/${item.image}" alt="http://127.0.0.1:4000/uploads/${item.image}">
            <span>${item.product_name}</span>
            <input value="${item.quantity}" min="1" max="1000">
            <span>${item.total_price}</span>
            <i class="fa-solid fa-trash" onclick="deleteFromCart(${item.cart_items_id})"></i>
        </div>`;
    });
    cartDiv.innerHTML += `<div class="cart-summary">
            <h3>Összesen: ${vegosszeg}</h3>
            <a href="#" class="checkout-btn">Tovább a pénztárhoz</a>
        </div>`;
}

async function deleteFromCart(cart_items_id) {
    const res = await fetch(`http://127.0.0.1:4000/api/cart/removeCart/${cart_items_id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    const data = await res.json();

    if(res.ok){
        alert('Termék eltávolítva');
        cartItems();
    }
    else{
        alert('Hiba törléskor', data.error);
    }
}

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
})

iconLogout.addEventListener('click', logout);

async function logout() {
    const res = await fetch('http://127.0.0.1:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    if(res.ok){
        alert(data.message);
        window.location.href="../relog/index.html";
    }else{
        alert('Hiba kijelentkezéskor');
    }
};

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});