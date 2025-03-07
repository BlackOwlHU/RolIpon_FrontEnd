import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');

Brand.addEventListener('click', () => {
    window.location.href="../admin/adminBrand.html";
});

category.addEventListener('click', () => {
    window.location.href="../admin/adminCategory.html";
});

orders.addEventListener('click', () => {
    window.location.href="../admin/admin.html";
});

products.addEventListener('click', () => {
    window.location.href="../admin/adminProduct.html";
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