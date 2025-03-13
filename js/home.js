import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconUser = document.getElementsByClassName('icon-user')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const menulogo = document.getElementsByClassName('menu-logo')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const cart2 = document.getElementsByClassName('cart2')[0];
const searchBar = document.getElementById('search-bar');

const row = document.getElementsByClassName('row-category')[0];
const rowbrand = document.getElementsByClassName('row-brand')[0];

var IsItSelected = false;

let selectedCategory = null;
let selectedBrand = null;
let searchQuery = '';

window.addEventListener('DOMContentLoaded', () => {
    getCategories();
    getBrands();
    getFilter();
});

cart2.addEventListener('click', () => {
    window.location.href = "../cart/cart.html";
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

// Searchbar lekérdezés
searchBar.addEventListener('input', (event) => {
    searchQuery = event.target.value;
    getFilter();
});

// Lekéri a kategóriákat
async function getCategories() {
    const res = await fetch('/api/filter/category', {
        method: 'GET',
        credentials: 'include'
    });
    const categoryList = await res.json();
    renderCategories(categoryList);
}

// Lekéri a márkákat
async function getBrands() {
    const res = await fetch('/api/filter/brands', {
        method: 'GET',
        credentials: 'include'
    });
    const brandList = await res.json();
    renderBrands(brandList);
}

async function getFilter() {
    const brandParam = selectedBrand || 0;
    const categoryParam = selectedCategory || 0;
    const searchParam = searchQuery || '';

    const url = `/api/products/getProducts/${brandParam}/${categoryParam}?search=${searchParam}`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    const productList = await res.json();
    renderProducts(productList);
}

function renderCategories(categoryList) {
    row.innerHTML = '';

    categoryList.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.classList.add('category');

        const catImage = document.createElement('img');
        catImage.src = `/uploads/${category.image}`;
        catImage.alt = 'category';
        catDiv.append(catImage);

        const catSpan = document.createElement('span');
        catSpan.textContent = category.category;
        catSpan.classList.add('category-name');
        catDiv.append(catSpan);

        row.append(catDiv);

        if (selectedCategory === category.category_id) {
            catDiv.classList.add('selected');
        }

        catDiv.addEventListener('click', () => {
            if (selectedCategory === category.category_id) {
                selectedCategory = null;
            } else {
                selectedCategory = category.category_id;
            }

            renderCategories(categoryList);
            getFilter();
        });
    });
}

function renderBrands(brandList) {
    rowbrand.innerHTML = '';

    brandList.forEach(brand => {
        const brandDiv = document.createElement('div');
        brandDiv.classList.add('brand');

        const brandSpan = document.createElement('span');
        brandSpan.textContent = brand.brand;
        brandSpan.classList.add('brandSpan');

        brandDiv.append(brandSpan);
        rowbrand.append(brandDiv);

        if (selectedBrand === brand.brand_id) {
            brandDiv.classList.add('selected');
        }

        brandDiv.addEventListener('click', () => {
            if (selectedBrand === brand.brand_id) {
                selectedBrand = null;
            } else {
                selectedBrand = brand.brand_id;
            }
            renderBrands(brandList);
            getFilter();
        });
    });
}

function renderProducts(productList) {
    const productContainer = document.getElementsByClassName('row-products')[0];
    productContainer.innerHTML = '';

    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <div class="card">
                <div class="card-header"></div>
                <div class="card-body">
                    <div class="pic-div">
                        <img src="/uploads/${product.image}" alt="${product.product_name}" class="selectItem">
                    </div>
                <div>
                <div class="card-footer">
                    <div>
                        <h3 class="selectItem">${product.product_name}</h3>
                        <p>Ár: ${product.price} Ft</p>
                    </div>
                    <i class="fa-solid fa-cart-shopping" style="font-size: 24px" data-product-id="${product.product_id}" data-quantity="1"></i>
                </div>
            </div>
        `;

        productDiv.addEventListener('click', () => {
            renderSelectedProduct(product.product_id);
        });

        if (!IsItSelected) {
            productContainer.append(productDiv);
        }
    });
    const cartIcons = document.querySelectorAll('.fa-cart-shopping');
    cartIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const quantity = event.target.getAttribute('data-quantity');
            addToCart(productId, quantity);
        });
    });
}

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

async function renderSelectedProduct(product_id) {
    IsItSelected = true;

    const productDivPage = document.getElementsByClassName('product-page-div')[0];
    productDivPage.innerHTML = ''; // Az előző termék adatait töröljük

    const res = await fetch(`/api/products/thisProduct/${product_id}`, {
        method: 'GET',
        credentials: 'include'
    });

    const selectedProduct = await res.json();

    if (res.ok) {
        console.log(selectedProduct);
    } else {
        alert(selectedProduct.error)
        window.location.href = '../homepage/home.html';
        return;
    }

    selectedProduct.forEach(product => {
        productDivPage.innerHTML = `
    <div class="product-page">
        <div class="product-details">
            <h4 class="back">Vissza a termékekhez.</h4>
            <br>
            <div class="product-data">
                <h1>${product.product_name}</h1>
                <p><strong>Kategória:</strong> ${product.category}</p>
                <p><strong>Márka:</strong> ${product.brand}</p>
                <p class="price">${product.price} Ft</p>
                <p class="status">${product.is_in_stock == "1" ? "Van raktáron." : "Nincs raktáron."}</p>
                <p><strong>Leírás:</strong> ${product.description}</p>
                <button class="buy-button" data-product-id="${product.product_id}" data-quantity="1">Hozzáadom a kosárhoz</button>
            </div>
        </div>
        <div class="product-image-container">
            <img src="/uploads/${product.image}" alt="${product.product_name}" class="product-image">
        </div>
    </div>
`;

        // A "Vissza" gomb eseménykezelése
        document.querySelector('.back').addEventListener('click', BackToMain);

        // Kosárba tétel eseménykezelése
        document.querySelector('.buy-button').addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            const quantity = event.target.getAttribute('data-quantity');
            addToCart(productId, quantity);
        });
    });

    getBrands();
    getCategories();
    getFilter();
}

window.addToCart = async function (product_id, quantity) {
    const res = await fetch('/api/cart/addCart', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ product_id, quantity })
    });

    const data = await res.json();
    if (res.ok) {
        Swal.fire({
            title: `${data.message}`,
            icon: "success",
            draggable: false
        });
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${data.error}`,
            draggable: false
        });
    }
};

window.BackToMain = function () {
    IsItSelected = false;

    const productDivPage = document.getElementsByClassName('product-page-div')[0];
    productDivPage.innerHTML = ''; // Eltávolítjuk az egyedi termék leírását

    getBrands();
    getCategories();
    getFilter();
};

// A termékhez való kosárba helyezés eseménykezelése
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-product-id');
        const quantity = event.target.getAttribute('data-quantity');
        addToCart(productId, quantity);
    });
});

// Visszalépés az alap termékekhez
document.querySelectorAll('.back').forEach(backButton => {
    backButton.addEventListener('click', () => {
        BackToMain();
    });
});

menulogo.addEventListener('click', () => {
    window.location.href = '../homepage/home.html'
})