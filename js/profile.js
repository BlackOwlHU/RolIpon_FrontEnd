const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const btnData = document.getElementById('editPost');
const btnPsw = document.getElementById('editPsw');
const btnOrders = document.getElementById('orders');
const menulogo = document.getElementsByClassName ('menu-logo')[0]
const cart = document.getElementsByClassName('cart')[0];

cart.addEventListener('click', () => {
    window.location.href="../cart/cart.html";
});

iconLogout.addEventListener('click', logout);

async function logout() {
    const res = await fetch('http://127.0.0.1:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();
    if(res.ok){
        window.location.href="../relog/index.html";
    }else{
        alert('Hiba kijelentkezéskor');
    }
};

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

btnData.addEventListener('click', () => {
    window.location.href = '../profile/profileInfo.html';
});

btnPsw.addEventListener('click', () => {
    window.location.href = '../profile/profilePsw.html';
});

btnOrders.addEventListener('click', () => { 
    window.location.href = '../homepage/home.html';
});

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
})