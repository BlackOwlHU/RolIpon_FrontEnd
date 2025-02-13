const iconHome = document.getElementsByClassName('icon-home')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const menulogo = document.getElementsByClassName ('menu-logo')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];

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

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html';
});

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
})

window.addEventListener('DOMContentLoaded', () => {loadData()});

async function loadData() {
    const res = await fetch('http://127.0.0.1:4000/api/profile/getProfile', {
        method: 'GET',
        credentials: 'include'
    })
    if (!res.ok) {
        console.error("Hiba az API hívásban");
        return;
    }
    const data = await res.json();
    
    renderCurrentData(data);
}

function renderCurrentData(data){
    // HTML elemek kiválasztása
    document.getElementById('firstname').value = data.firstname || "";
    document.getElementById('surname').value = data.surname || "";
    document.getElementById('city').value = data.city || "";
    document.getElementById('postcode').value = data.postcode || "";
    document.getElementById('address').value = data.address || "";
    document.getElementById('tel').value = data.tel || "";
    document.getElementById('email').value = data.email || "";
}