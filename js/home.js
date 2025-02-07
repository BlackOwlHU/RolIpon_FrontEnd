const iconUser = document.getElementsByClassName('icon-user')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const categories = document.getElementsByClassName('categories')[0];

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

// Termékek megjelenítése
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
                            <img src="http://127.0.0.1:4000/uploads/${product.image}" alt="${product.product_name}"  class="selectItem" onclick="renderSelectedProduct(${product.product_id})">
                        </div>
                    <div>
                    <div class="card-footer">
                        <div>
                            <h3 class="selectItem" onclick="renderSelectedProduct(${product.product_id})">${product.product_name}</h3>
                            <p>Ár: ${product.price} Ft</p>
                        </div>
                        <i class="fa-solid fa-cart-shopping" style="font-size: 24px"></i>
                </div>
            </div>
        `;
        if(!IsItSelected){
            productContainer.append(productDiv);
        }
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

    if(res.ok){
        console.log(selectedProduct);
    }else{
        alert(selectedProduct.error)
        window.location.href = '../homepage/home.html';
        return;
    }
    
    selectedProduct.forEach(product => {
        productDivPage.innerHTML = `
            <div class="product-page">
                <div class="product-details">
                    <h1>${product.product_name}</h1>
                    <p><strong>Kategória:</strong> ${product.category_id}</p>
                    <p><strong>Márka:</strong> ${product.brand_id}</p>
                    <p class="price">${product.price} Ft</p>
                    <p class="status">${product.is_in_stock}</p>
                    <p><strong>Leírás:</strong> ${product.description}</p>
                    <button class="buy-button">Hozzáadom a kosárhoz</button>
                    <h4 onclick="BackToMain()" class="back">Vissza a termékekhez.</h4>
                </div>
                <div class="product-image-container">
                    <img src="http://127.0.0.1:4000/uploads/${product.image}" alt="${product.product_name}" class="product-image">
                </div>
            </div>
        `;
    });

    getBrands();
    getCategories();
    getFilter();
}

function BackToMain(){
    IsItSelected = false;
    IsItSelectedCheck = false; // Az állapot visszaállítása, hogy az elemek megjelenjenek újra

    const productDivPage = document.getElementsByClassName('product-page-div')[0];
    productDivPage.innerHTML = ''; // Eltávolítjuk az egyedi termék leírását

    getBrands();
    getCategories();
    getFilter();
}