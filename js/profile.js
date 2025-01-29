const iconLogout = document.getElementsByClassName('icon-logout')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const btnPic = document.getElementsByClassName('edit-pic')[0];
const btnName = document.getElementById('editName');
const btnPsw = document.getElementById('editPsw');

iconLogout.addEventListener('click', logout);

// profilkép megjelenítése
async function getProfilePic() {
    const res = await fetch('http://127.0.0.1:3000/api/profile/getProfilePic', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await res.json();
    //console.log(data);
    if(res.ok){
        btnPic.style.backgroundImage = `url(http://127.0.0.1:3000/uploads/${data[0].profile_pic})`;
    };
};

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

btnName.addEventListener('click', () => {
    window.location.href = '../profileName.html';
});

btnPsw.addEventListener('click', () => {
    window.location.href = '../profilePsw.html';
});