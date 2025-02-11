const iconUser = document.getElementsByClassName('icon-user')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnDataSave = document.getElementById('dataSave');
const menulogo = document.getElementsByClassName ('menu-logo')[0]

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
    console.log(data);
    
    renderCurrentData(data);
}

function renderCurrentData(data){
    // HTML elemek kiválasztása
    document.getElementById('username').value = data.username || "";
    document.getElementById('firstname').value = data.firstname || "";
    document.getElementById('surname').value = data.surname || "";
    document.getElementById('city').value = data.city || "";
    document.getElementById('postcode').value = data.postcode || "";
    document.getElementById('address').value = data.address || "";
    document.getElementById('tel').value = data.tel || "";
}

btnDataSave.addEventListener('click', SaveData);

async function SaveData() {
    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const surname = document.getElementById('surname').value;
    const city = document.getElementById('city').value;
    const postcode = document.getElementById('postcode').value;
    const address = document.getElementById('address').value;
    const tel = document.getElementById('tel').value;

    const res = await fetch('http://127.0.0.1:4000/api/profile/editProfile', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, firstname, surname, city, postcode, address, tel})
    });
    const data = await res.json();
    if(res.ok){
        alert(data.message);
        window.location.href="../profile/profile.html";
    }else{
        alert(data.error);
    }
}

iconUser.addEventListener('click', () => {
    window.location.href = '../profile/profile.html';
});

iconHome.addEventListener('click', () => {
    window.location.href = '../homepage/home.html'
});

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

menulogo.addEventListener('click', ()=> {
    window.location.href = '../homepage/home.html'
})