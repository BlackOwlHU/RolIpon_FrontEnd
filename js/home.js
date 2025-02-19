import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm';

const iconUser = document.getElementsByClassName('icon-user')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const menulogo = document.getElementsByClassName('menu-logo')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const cart = document.getElementsByClassName('cart')[0];

const row = document.getElementsByClassName('row-category')[0];
const rowbrand = document.getElementsByClassName('row-brand')[0];

var IsItSelected = false;
var IsItSelectedCheck = false;

let selectedCategory = null;
let selectedBrand = null;

window.addEventListener('DOMContentLoaded', () => {
    getCategories();
    getBrands();
    getFilter();
});

cart.addEventListener('click', () => {
    window.location.href = "../cart/cart.html";
});

iconLogout.addEventListener('click', logout);

async function logout() {
    const res = await fetch('http://127.0.0.1:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
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

// Lekéri a kategóriákat
async function getCategories() {
    const res = await fetch('http://127.0.0.1:4000/api/filter/category', {
        method: 'GET',
        credentials: 'include'
    });
    const categoryList = await res.json();
    renderCategories(categoryList);
}

// Lekéri a márkákat
async function getBrands() {
    const res = await fetch('http://127.0.0.1:4000/api/filter/brands', {
        method: 'GET',
        credentials: 'include'
    });
    const brandList = await res.json();
    renderBrands(brandList);
}

async function getFilter() {
    const brandParam = selectedBrand || 0;
    const categoryParam = selectedCategory || 0;

    const url = `http://127.0.0.1:4000/api/products/getProducts/${brandParam}/${categoryParam}`;

    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
    });

    const productList = await res.json();
    renderProducts(productList);
}

function IsSelectedNull(br, cat) {
    if (br === null) selectedBrand = 0;
    if (cat === null) selectedCategory = 0;
}

// Kategóriák megjelenítése
function renderCategories(categoryList) {
    row.innerHTML = '';

    categoryList.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.classList.add('category');

        // Kép hozzáadása
        const catImage = document.createElement('img');
        catImage.src = `http://127.0.0.1:4000/uploads/${category.image}`;
        catImage.alt = 'category';
        catDiv.append(catImage);

        // Kategória neve
        const catSpan = document.createElement('span');
        catSpan.textContent = category.category;
        catSpan.classList.add('category-name');
        catDiv.append(catSpan);

        row.append(catDiv);

        // Ha ez a kiválasztott kategória, adjunk neki "selected" osztályt
        if (selectedCategory === category.category_id) {
            catDiv.classList.add('selected');
        }

        // Kattintás esemény
        catDiv.addEventListener('click', () => {
            if (selectedCategory === category.category_id) {
                selectedCategory = null; // Ha már ki van választva, töröljük
            } else {
                selectedCategory = category.category_id;
            }

            // Frissítjük a kategóriák megjelenését
            renderCategories(categoryList);

            // Frissítjük a termékeket
            getFilter();
        });
    });
}

// Márkák megjelenítése
function renderBrands(brandList) {
    rowbrand.innerHTML = '';

    brandList.forEach(brand => {
        const brandDiv = document.createElement('div');
        brandDiv.classList.add('brand');

        // Márka neve
        const brandSpan = document.createElement('span');
        brandSpan.textContent = brand.brand;
        brandSpan.classList.add('brandSpan');

        brandDiv.append(brandSpan);
        rowbrand.append(brandDiv);

        // Ha ez a kiválasztott márka, adjunk neki "selected" osztályt
        if (selectedBrand === brand.brand_id) {
            brandDiv.classList.add('selected');
        }

        // Kattintás esemény
        brandDiv.addEventListener('click', () => {
            if (selectedBrand === brand.brand_id) {
                selectedBrand = null; // Ha már ki van választva, töröljük
            } else {
                selectedBrand = brand.brand_id;
            }

            // Frissítjük a márkák megjelenését
            renderBrands(brandList);

            // Frissítjük a termékeket
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
                        <img src="http://127.0.0.1:4000/uploads/${product.image}" alt="${product.product_name}" class="selectItem">
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
            renderSelectedProduct(product.product_id);  // Meghívjuk a globálisan elérhető renderSelectedProduct függvényt
        });

        if (!IsItSelected) {
            productContainer.append(productDiv);
        }
    });

    // Add event listeners for the cart buttons
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
    IsItSelectedCheck = false; // Amikor egy új terméket kiválasztunk, visszaállítjuk

    const productDivPage = document.getElementsByClassName('product-page-div')[0];
    productDivPage.innerHTML = ''; // Az előző termék adatait töröljük

    const res = await fetch(`http://127.0.0.1:4000/api/products/thisProduct/${product_id}`, {
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
            <img src="http://127.0.0.1:4000/uploads/${product.image}" alt="${product.product_name}" class="product-image">
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
    const res = await fetch('http://127.0.0.1:4000/api/cart/addCart', {
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
    IsItSelectedCheck = false; // Az állapot visszaállítása, hogy az elemek megjelenjenek újra

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