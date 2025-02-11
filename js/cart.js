const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconUser = document.getElementsByClassName('icon-user')[0];
const iconPlus = document.getElementsByClassName('fixed')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];

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