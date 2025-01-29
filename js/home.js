const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];
const categories = document.getElementsByClassName('categories')[0];
let selectedCategory = null;

window.addEventListener('DOMContentLoaded', getCategories);
window.addEventListener('DOMContentLoaded', getBrands)

async function getCategories() {
    const res = await fetch('http://127.0.0.1:4000/api/filter/category', {
        method: 'GET',
        credentials: 'include'
    });

    const categoryList = await res.json();
    renderCategories(categoryList);
}

async function getBrands() {
    const res = await fetch('http://127.0.0.1:4000/api/filter/brands', {
        method: 'GET',
        credentials: 'include'
    });
    
    const brandList = await res.json();
    renderBrands(brandList);
}

async function getProducts(category, brand) {
    console.log(category, brand);
};

iconLogout.addEventListener('click', logout);

async function logout() {
    const res = await fetch('http://127.0.0.1:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    if(res.ok){
        alert(data.message);
        window.location.href="../relog/index.html";
    }else{
        alert('Hiba kijelentkezéskor');
    }
};

function renderBrands(brandList){
    const rowbrand = document.getElementsByClassName('row-brand')[0];
    rowbrand.innerHTML = '';

    for(const brand of brandList){
        // brand div létrehozása
        const brandDiv = document.createElement('div');
        brandDiv.classList.add('brand');

        // brandek kiírása
        const brandSpan = document.createElement('span');
        brandSpan.textContent = brand.brand;
        //console.log(brand.brand);
        brandSpan.classList.add('brandSpan');
        
        brandDiv.append(brandSpan);

        rowbrand.append(brandDiv);
    }
}

function renderCategories(categoryList){
    const row = document.getElementsByClassName('row-category')[0];
    row.innerHTML = '';

    for(const category of categoryList){
        // category div létrehozása
        const catDiv = document.createElement('div');
        catDiv.classList.add('category');

        // category kép
        const catImage = document.createElement('img');
        catImage.src = `http://127.0.0.1:4000/uploads/${category.image}`;
        catImage.alt = 'category';
        catDiv.append(catImage);

        // category name
        const catSpan = document.createElement('span');
        catSpan.textContent = category.category;
        catSpan.classList.add('category-name');
        catDiv.append(catSpan);

        row.append(catDiv);

        catDiv.addEventListener('click', () => getProducts(category.category));
    }
}

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});
