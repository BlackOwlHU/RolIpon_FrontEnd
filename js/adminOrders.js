import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');
const orderContainer = document.querySelector('orderCont');

Brand.addEventListener('click', () => {
    window.location.href = "../admin/adminBrand.html";
});

category.addEventListener('click', () => {
    window.location.href = "../admin/adminCategory.html";
});

orders.addEventListener('click', () => {
    window.location.href = "../admin/admin.html";
});

products.addEventListener('click', () => {
    window.location.href = "../admin/adminProduct.html";
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hiba történt a kijelentkezés során",
            draggable: false
        });
    }
};

document.addEventListener('DOMContentLoaded', loadOrders);

async function loadOrders() {
    try {
        const ordersRes = await fetch('/api/order/getAllOrders', {
            method: 'GET',
            credentials: 'include'
        });
        const orders = await ordersRes.json();

        const itemsRes = await fetch('/api/order/getAllOrdersItems', {
            method: 'GET',
            credentials: 'include'
        });
        const items = await itemsRes.json();

        if (ordersRes.ok && itemsRes.ok) {
            renderOrders(orders, items);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${orders.error} ${items.error}`,
                draggable: false
            });
        }
    } catch (error) {
        console.error('Hiba történt:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hiba történt az adatok lekérése során",
            draggable: false
        });
    }
}

function renderOrders(orders, items) {
    orderContainer.innerHTML = '';

    orders.forEach(order => {
        const orderItems = items.filter(item => item.order_id === order.order_id);
        const orderElement = document.createElement('div');
        orderElement.classList.add('order', 'card');
        orderElement.innerHTML = `
            <strong>${order.firstname} ${order.surname}</strong>
            ${orderItems.map(item => `<span>${item.product_name} - ${item.quantity} db</span>`).join('')}
            <span>${order.city}</span>
            <span>${order.postcode}</span>
            <span>${order.address}</span>
            <span>${order.order_date}</span>
            <span>Összeg: ${order.total_amount} Ft</span>
        `;
        orderContainer.appendChild(orderElement);
    });
}