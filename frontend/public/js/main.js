const btnLogout = document.getElementById('btnCerrarSesion');
const btnRegistrarse = document.getElementById('btnRegistrarse');
const btnPresalas = document.getElementById('btnPresalas');
const btnHome = document.getElementById('btnHome');
const btnDarkMode = document.getElementById('btnDarkMode');

if (btnDarkMode) {
    btnDarkMode.addEventListener('click', ()=>{
        const navbar = document.querySelector('.navbar');
        const body = document.body;
        const header = document.getElementById('divHeader');
        const btns = document.querySelectorAll('.btnHeader')
        body.style.background = '#000';
        header.style.background = '#000';
        navbar.style.background = '#000';
        btns.forEach(btn =>{
            btn.addEventListener('click', ()=>{
                btns.style.color = 'white';
            })
        })
    })
}

if (btnHome) {
    btnHome.addEventListener('click', ()=>{
        window.location.href = '/cunca/inicio'
    })
}

if (btnLogout) {
    btnLogout.addEventListener('click', async ()=>{
        await fetch('http://localhost:1234/cunca/logout');
        window.location.href = '/cunca/inicio'
    })
}

if (btnRegistrarse) {
    btnRegistrarse.addEventListener('click', ()=>{
        window.location.href = '/cunca/registro'
    })
}

if (btnPresalas) {
    btnPresalas.addEventListener('click', ()=>{
        window.location.href = '/cunca/presalas'
    })
}