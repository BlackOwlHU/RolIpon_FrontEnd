const iconUser = document.getElementsByClassName('icon-user')[0];
const iconHome = document.getElementsByClassName('icon-home')[0];
const iconLogout = document.getElementsByClassName('icon-logout')[0];
const btnSave = document.getElementById('PswSave');

btnSave.addEventListener('click', editProfilePsw);

async function editProfilePsw() {
    const oldPassword = document.getElementById('oldpsw').value;
    const psw = document.getElementById('psw').value;
    const psw2 = document.getElementById('psw2').value;
    if(psw === psw2){
        const res = await fetch('http://127.0.0.1:4000/api/profile/editPassword', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({oldPassword, newPassword: psw})
        });
        const data = await res.json();
        if(res.ok){
            alert(data.message);
            logout();
        }else{
            alert(data.error);
        }
    }else{
        alert('A két jelszó nem egyezik vagy nem jó jelszót adtál meg!');
    };
};

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