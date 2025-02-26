import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconLogout = document.getElementsByClassName('icon-logout')[0];
const orders = document.getElementById('Orders');
const products = document.getElementById('Products');
const category = document.getElementById('Category');
const Brand = document.getElementById('Brand');
const showProducts = document.getElementsByClassName('product')[0];
const showNewProduct = document.getElementsByClassName('newProduct')[0];
const newItem = document.getElementsByClassName('newItem')[0];

newItem.addEventListener('click', () => {renderNewProduct()});

async function renderNewProduct() {
    showProducts.innerHTML = '';
    showNewProduct.innerHTML= '';
    const res = await fetch('http://127.0.0.1:4000/api/filter/category', {
        method: 'GET',
        credentials: 'include'
    });
    const categoryList = await res.json();
    const res2 = await fetch('http://127.0.0.1:4000/api/filter/brands', {
        method: 'GET',
        credentials: 'include'
    });
    const brandList = await res2.json();
    showNewProduct.innerHTML= `<div class="container column">
        <h2 id='backToProducts'>Vissza a termékekhez.</h2>

        <label for="name">Termék neve</label>
        <input type="text" id="name">
    
        <label for="price">Ára</label>
        <input type="number" id="price">
    
        <label for="type">Elérhető</label>
        <select id="typeStock">
            <option value="1">Igen</option>
            <option value="0">Nem</option>
        </select>
    
        <label for="type">Márka</label>
        <select id="typeBrand">
        </select>
    
        <label for="type">Kategóra</label>
        <select id="typeCategory">
        </select>
    
        <label for="description">Leírás</label>
        <textarea id="description" rows="4"></textarea>

        <label for="image">Kép feltöltése</label>
        <input type="file" id="image" accept="image/*">
    
        <button>Termék szerkesztése</button>
    </div>`;
    const categorySelect = document.getElementById('typeCategory');
    const brandSelect = document.getElementById('typeBrand');

    for(const cat of categoryList){
        categorySelect.innerHTML += `<option value="${cat.category}">${cat.category}</option>`;
    }

    for(const brandy of brandList){
        brandSelect.innerHTML += `<option value="${brandy.brand}">${brandy.brand}</option>`;
    }

    document.getElementById('backToProducts').addEventListener('click', getProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
})

async function getProducts() {
    const res = await fetch('http://127.0.0.1:4000/api/products/getProducts/0/0', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    renderProducts(data);
};

async function renderProducts(productList) {
    showProducts.innerHTML = '';
    showNewProduct.innerHTML= '';

    for (const product of productList) {
        showProducts.innerHTML += `
            <div class="order card">
                <div class="card-body">
                    <div class="pic-div">
                        <img src="http://127.0.0.1:4000/uploads/${product.image}" alt="${product.product_name}" class="selectItem">
                    </div>
                <div>
                <div class="card-footer">
                    <div>
                        <h3 class="selectItem">${product.product_name}</h3>
                        <p>Ár: ${product.price} Ft</p>
                        <p>Márka: ${product.brand}</p>
                        <p>Kategória: ${product.category}</p>
                        <p>Leírás: ${product.description}</p>
                        <i class="fa-solid fa-trash trash data" data-order-id="${product.product_id}"></i>
                    </div>
                </div>
            </div>
        `;
    }
};

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
    const res = await fetch('http://127.0.0.1:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if (res.ok) {
        window.location.href = "../relog/index.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hiba történt a kijelentkezés során",
            draggable: false
        });
    }
};