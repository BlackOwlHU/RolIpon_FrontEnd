import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');
const showBrands = document.getElementsByClassName('brand-list')[0];
const showNewBrand = document.getElementsByClassName('newBrand')[0];
const newItem = document.getElementsByClassName('newItem')[0];

newItem.addEventListener('click', () => { renderNewBrandForm() });

async function renderNewBrandForm() {
    showBrands.innerHTML = '';
    showNewBrand.innerHTML = `
        <div class="container column">
            <h2 id='backToBrands'>Vissza a márkákhoz.</h2>
            <label for="name">Márka neve</label>
            <input type="text" id="name">
            <button id="saveBrand">Márka hozzáadása</button>
        </div>`;
    document.getElementById('backToBrands').addEventListener('click', getBrands);
    document.getElementById('saveBrand').addEventListener('click', saveBrand);
}

async function saveBrand() {
    const brand = document.getElementById('name').value;

    const res = await fetch('/api/filter/newbrand', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ brand })
    });

    const data = await res.json();
    if (res.ok) {
        Swal.fire({
            title: `${data.message}`,
            icon: "success",
            draggable: false
        }).then(() => {
            getBrands();
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.error}`,
            draggable: false
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getBrands();
});

async function getBrands() {
    const res = await fetch('/api/filter/brands', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    renderBrands(data);
}

async function renderBrands(brandList) {
    showBrands.innerHTML = '';
    showNewBrand.innerHTML = '';

    for (const brand of brandList) {
        showBrands.innerHTML += `
            <div class="order card">
                <strong>Márka: ${brand.brand}</strong>
                <i class="fa-solid fa-trash trash data" data-brand-id="${brand.brand_id}"></i>
            </div>`;
    }

    document.querySelectorAll('.trash').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const brandId = event.target.getAttribute('data-brand-id');
            await deleteBrand(brandId);
        });
    });
}

async function deleteBrand(brandId) {
    const res = await fetch(`/api/filter/brand/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ brand_id: brandId })
    });

    if (res.ok) {
        Swal.fire("Siker!", "A márka törölve lett.", "success");
        getBrands();
    } else {
        const data = await res.json();
        Swal.fire("Hiba!", data.error, "error");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getCategories();
});

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