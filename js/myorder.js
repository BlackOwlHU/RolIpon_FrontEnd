import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const menulogo = document.getElementsByClassName ('menu-logo')[0]
const cart = document.getElementsByClassName('cart')[0];

window.addEventListener('DOMContentLoaded', () => {
    loadOrders();
})

async function loadOrders() {
    const res = await fetch('/api/order/orders', {
        method: 'GET',
        credentials: 'include'
    });

    const orders = await res.json();
    /*<div class="order">
                    <div class="data">Lakatos József</div>
                    <div class="products data">
                        <span>PS5 - 1 db</span>
                        <span>PS4 Slim - 3 db</span>
                        <span>Xbox 360 - 2 db</span>
                        <span>500.000Ft</span>
                    </div>
                    <div class="data location">
                        <div class="data">Debrecen</div>
                        <div class="data">4200</div>
                        <div class="data">Árpád u. 31.</div>
                    </div>
                    <div class="data">2024.09.27</div>
                    <i class="fa-solid fa-trash trash data" data-cart-id="${item.cart_items_id}"></i>
                </div>*/
    if(res.ok){
        loadOrdersToPage(orders);
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Üres a kosarad!",
            draggable: false
        });
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

async function loadOrdersToPage(orders) {
    const rowContainer = document.querySelector('.row');
    rowContainer.innerHTML = ""; // Korábbi tartalom törlése

    for (const order of orders) {
        const order_id = order.order_id;

        // Rendeléshez tartozó termékek lekérése
        const res = await fetch(`/api/order/orderedItems/${order_id}`, {
            method: 'GET',
            credentials: 'include'
        });

        const orderItems = await res.json();

        rowContainer.innerHTML += `
            <div class="order">
                <div class="data"><strong>${order.firstname} ${order.surname}</strong></div>
                <div class="products data">
                    ${orderItems.map(item => `<span>${item.product_name} - ${item.quantity} db</span>`).join('')}
                    <span>${order.total_amount} Ft</span>
                </div>
                <div class="data location">
                    <div class="data">${order.city}</div>
                    <div class="data">${order.postcode}</div>
                    <div class="data">${order.address}</div>
                </div>
                <div class="data">${formatDate(order.order_date)}</div>
                <i class="fa-solid fa-trash trash data" data-order-id="${order.order_id}"></i>
            </div>
        `;
    }

    // Törlés eseménykezelő hozzárendelése az ikonokhoz
    document.querySelectorAll('.trash').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const orderId = event.target.getAttribute('data-order-id');
            await deleteOrder(orderId);
        });
    });
}

// Rendelés törlése
async function deleteOrder(orderId) {
    try {
        const res = await fetch(`/api/order/deleteOrder/${orderId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (res.ok) {
            Swal.fire("Siker!", "A rendelés törölve lett.", "success");
            loadOrders(); // Frissítés törlés után
        } else {
            Swal.fire("Hiba!", "A rendelés törlése nem sikerült.", "error");
        }
    } catch (error) {
        console.error('Hiba a törlés közben:', error);
    }
}

cart.addEventListener('click', () => {
    window.location.href = "../cart/cart.html";
});

iconLogout.addEventListener('click', logout);

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

async function logout() {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if(res.ok){
        window.location.href="../index.html";
    }else{
        alert('Hiba kijelentkezéskor');
    }
};