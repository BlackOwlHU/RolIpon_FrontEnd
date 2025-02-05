const iconuser = document.getElementsByClassName('icon-user')[0];
const iconhome = document.getElementsByClassName('icon-home')[0];
const iconlogout = document.getElementsByClassName('icon-logout')[0];
const iconplus = document.getElementsByClassName('fixed')[0];

let pId = 0;

iconlogout.addEventListener('click', Logout);

async function Logout() {
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

iconhome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconuser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

window.addEventListener('DOMContentLoaded', 
    () => {
        if(window.location.href === '../homepage/selectedProduct.html'){
            renderSelectedProduct(pId);
        }
    }
)

function productId(id){
    pId = id;
    window.location.href = '../homepage/selectedProduct.html';
    if(window.location.href === '../homepage/selectedProduct.html'){
        renderSelectedProduct(pId);
    }
}

async function renderSelectedProduct(product_id) {
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
    }
}