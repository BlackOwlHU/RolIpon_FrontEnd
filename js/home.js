const iconUser = document.getElementsByClassName('icon-user')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const categories = document.getElementsByClassName('categories')[0];

const row = document.getElementsByClassName('row-category')[0];
const rowbrand = document.getElementsByClassName('row-brand')[0];

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
    IsSelectedNull(selectedBrand, selectedCategory);

    const url = `http://127.0.0.1:4000/api/products/getProducts/${selectedBrand}/${selectedCategory}`;

    //console.log(`Lekérdezés: ${url}`);

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

        // Kattintás esemény
        catDiv.addEventListener('click', () => {
            selectedCategory = category.category_id;
            getFilter(); // Frissítjük a termékeket az új filterekkel
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

        // Kattintás esemény
        brandDiv.addEventListener('click', () => {
            selectedBrand = brand.brand_id;
            getFilter(); // Frissítjük a termékeket az új filterekkel
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
                            <img src="http://127.0.0.1:4000/uploads/${product.image}" alt="${product.product_name}">
                        </div>
                    <div>
                    <div class="card-footer">
                        <div>
                            <h3 onclick="productId(${product.product_id})">${product.product_name}</h3>
                            <p>Ár: ${product.price} Ft</p>
                        </div>
                        <i class="fa-solid fa-cart-shopping" style="font-size: 24px"></i>
                </div>
            </div>
        `;

        productContainer.append(productDiv);
    });
}

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});
