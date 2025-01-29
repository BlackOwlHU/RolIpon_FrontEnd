const btnLogin = document.getElementsByClassName('login')[0];
const btnReg = document.getElementsByClassName('reg')[0];

btnLogin.addEventListener('click', () => {
    window.location.href="../relog/login.html"
});

btnReg.addEventListener('click', () => {
    window.location.href='../relog/register.html'
});