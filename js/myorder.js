const iconUser = document.getElementsByClassName('icon-user')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const menulogo = document.getElementsByClassName ('menu-logo')[0]
const cart = document.getElementsByClassName('cart')[0];

cart.addEventListener('click', () => {
    window.location.href = "../cart/cart.html";
});

iconLogout.addEventListener('click', logout);

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

async function logout() {
    const res = await fetch('http://127.0.0.1:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    if(res.ok){
        window.location.href="../relog/index.html";
    }else{
        alert('Hiba kijelentkezéskor');
    }
};