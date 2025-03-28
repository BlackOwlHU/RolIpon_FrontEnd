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
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if(res.ok){
        window.location.href="../index.html";
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
    window.location.href = '../profile/orders.html';
});

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
})