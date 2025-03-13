import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');
const showProducts = document.getElementsByClassName('product')[0];
const showNewProduct = document.getElementsByClassName('newProduct')[0];
const showBrands = document.getElementsByClassName('brand-list')[0];
const showNewBrand = document.getElementsByClassName('newBrand')[0];
const newItem = document.getElementsByClassName('newItem')[0];

newItem.addEventListener('click', () => { renderNewProductForm() });

async function renderNewProductForm() {
    showProducts.innerHTML = '';
    showNewProduct.innerHTML = '';
    const res = await fetch('/api/filter/category', {
        method: 'GET',
        credentials: 'include'
    });
    const categoryList = await res.json();
    const res2 = await fetch('/api/filter/brands', {
        method: 'GET',
        credentials: 'include'
    });
    const brandList = await res2.json();
    showNewProduct.innerHTML = `
        <div class="container column">
            <h2 id='backToProducts'>Vissza a termékekhez.</h2>
            <label for="name">Termék neve</label>
            <input type="text" id="name">
            <label for="price">Ára</label>
            <input type="number" id="price">
            <label for="typeStock">Elérhető</label>
            <select id="typeStock">
                <option value="1">Igen</option>
                <option value="0">Nem</option>
            </select>
            <label for="typeBrand">Márka</label>
            <select id="typeBrand"></select>
            <label for="typeCategory">Kategóra</label>
            <select id="typeCategory"></select>
            <label for="description">Leírás</label>
            <textarea id="description" rows="4"></textarea>
            <label for="image">Kép feltöltése</label>
            <input type="file" id="image" accept="image/*">
            <button id="saveProduct">Termék hozzáadása</button>
        </div>`;
    const categorySelect = document.getElementById('typeCategory');
    const brandSelect = document.getElementById('typeBrand');

    for (const cat of categoryList) {
        categorySelect.innerHTML += `<option value="${cat.category_id}">${cat.category}</option>`;
    }

    for (const brand of brandList) {
        brandSelect.innerHTML += `<option value="${brand.brand_id}">${brand.brand}</option>`;
    }

    document.getElementById('backToProducts').addEventListener('click', getProducts);
    document.getElementById('saveProduct').addEventListener('click', saveProduct);
}

async function saveProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const is_in_stock = document.getElementById('typeStock').value;
    const brand_id = document.getElementById('typeBrand').value;
    const category_id = document.getElementById('typeCategory').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').files[0];
    const formData = new FormData();
    formData.append('product_name', name);
    formData.append('price', price);
    formData.append('is_in_stock', is_in_stock);
    formData.append('brand_id', brand_id);
    formData.append('category_id', category_id);
    formData.append('description', description);
    formData.append('image', image);

    const res = await fetch('/api/products/newProduct', {
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
            getProducts();
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
    getProducts();
});

async function getProducts() {
    const res = await fetch('/api/products/getProducts/0/0', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    renderProducts(data);
    console.log(data);
}

async function renderProducts(productList) {
    showProducts.innerHTML = '';
    showNewProduct.innerHTML = '';

    for (const product of productList) {
        showProducts.innerHTML += `
            <div class="order card">
                <div class="card-body">
                    <div class="pic-div">
                        <img src="/uploads/${product.image}" alt="${product.product_name}" class="selectItem">
                    </div>
                <div>
                <div class="card-footer">
                    <div>
                        <h3 class="selectItem">${product.product_name}</h3>
                        <p>Ár: ${product.price} Ft</p>
                        <p>Márka: ${product.brand}</p>
                        <p>Kategória: ${product.category}</p>
                        <p>Leírás: ${product.description}</p>
                        <i class="fa-solid fa-trash trash data" data-product-id="${product.product_id}"></i>
                    </div>
                </div>
            </div>
        `;
    }

    document.querySelectorAll('.trash').forEach(icon => {
        icon.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-product-id');
            await deleteProduct(productId);
        });
    });
}

async function deleteProduct(productId) {
    const res = await fetch(`/api/products/deleteProduct`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id: productId })
    });

    if (res.ok) {
        Swal.fire("Siker!", "A termék törölve lett.", "success");
        getProducts();
    } else {
        const data = await res.json();
        Swal.fire("Hiba!", data.error, "error");
    }
}

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
}