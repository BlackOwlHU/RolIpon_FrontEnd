import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');
const showCategories = document.getElementsByClassName('category-list')[0];
const showNewCategory = document.getElementsByClassName('newCategory')[0];
const newItem = document.getElementsByClassName('newItem')[0];

newItem.addEventListener('click', () => { renderNewCategoryForm() });

async function renderNewCategoryForm() {
    showCategories.innerHTML = '';
    showNewCategory.innerHTML = `
        <div class="container column">
            <h2 id='backToCategories'>Vissza a kategóriákhoz.</h2>
            <label for="name">Kategória neve</label>
            <input type="text" id="name">
            <label for="image">Kép feltöltése</label>
            <input type="file" id="image" accept="image/*">
            <button id="saveCategory">Kategória hozzáadása</button>
        </div>`;
    document.getElementById('backToCategories').addEventListener('click', getCategories);
    document.getElementById('saveCategory').addEventListener('click', saveCategory);
}

async function saveCategory() {
    const category = document.getElementById('name').value;
    const image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append('category', category);
    formData.append('image', image);

    const res = await fetch('/api/filter/newcategory', {
        method: 'POST',
        credentials: 'include',
        body: formData
    });

    const data = await res.json();
    if (res.ok) {
        Swal.fire({
            title: `${data.message}`,
            icon: "success",
            draggable: false
        }).then(() => {
            getCategories();
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
    getCategories();
});

async function getCategories() {
    const res = await fetch('/api/filter/category', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    renderCategories(data);
}

async function renderCategories(categoryList) {
    showCategories.innerHTML = '';
    showNewCategory.innerHTML = '';

    for (const category of categoryList) {
        showCategories.innerHTML += `
            <div class="order card">
                <strong>Kategória: ${category.category}</strong>
                <img src="/uploads/${category.image}" alt="${category.category}">
                <i class="fa-solid fa-trash trash data" data-category-id="${category.category_id}"></i>
            </div>`;
    }

    document.querySelectorAll('.trash').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const categoryId = event.target.getAttribute('data-category-id');
            await deleteCategory(categoryId);
        });
    });
}

async function deleteCategory(categoryId) {
    const res = await fetch(`/api/filter/category/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category_id: categoryId })
    });

    if (res.ok) {
        Swal.fire("Siker!", "A kategória törölve lett.", "success");
        getCategories();
    } else {
        const data = await res.json();
        Swal.fire("Hiba!", data.error, "error");
    }
}

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