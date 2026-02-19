const btnLogout = document.getElementById('btnCerrarSesion');
const btnRegistrarse = document.getElementById('btnRegistrarse');
const btnPresalas = document.getElementById('btnPresalas');
const btnHome = document.getElementById('btnHome');

if (btnHome) {
    btnHome.addEventListener('click', ()=>{
        window.location.href = '/cunca/inicio'
    })
}

if (btnLogout) {
    btnLogout.addEventListener('click', async ()=>{
        const response = await fetch('http://localhost:1234/cunca/logout');
        const data = await response.json()
        console.log(data);
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