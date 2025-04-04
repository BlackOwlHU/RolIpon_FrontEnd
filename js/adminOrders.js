import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');
const orderContainer = document.getElementsByClassName('orderCont')[0];

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
            <strong>${order.email}</strong>
            <strong>${order.tel}</strong>
            <ul>
                <span>Rendelt termékek:</span>
                <ol>
                ${orderItems.map(item => `<li>${item.product_name} - ${item.quantity} db</li>`).join('')}
                </ol>
                <li><span>${order.city}</span></li>
                <li><span>${order.postcode}</span></li>
                <li><span>${order.address}</span></li>
                <li><span>${order.order_date}</span></li>
                <li><span>Összeg: ${order.total_amount} Ft</span></li>
            </ul>
            <i class="fa-solid fa-trash trash data" data-order-id="${order.order_id}"></i>
        `;
        orderContainer.appendChild(orderElement);
    });

    document.querySelectorAll('.trash').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const orderId = event.target.getAttribute('data-order-id');
            await deleteOrder(orderId);
        });
    });
}

async function deleteOrder(orderId) {
    try {
        const res = await fetch(`/api/order/deleteOrder/${orderId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (res.ok) {
            Swal.fire("Siker!", "A rendelés törölve lett.", "success");
            loadOrders();
        } else {
            Swal.fire("Hiba!", "A rendelés törlése nem sikerült.", "error");
        }
    } catch (error) {
        console.error('Hiba a törlés közben:', error);
    }
}