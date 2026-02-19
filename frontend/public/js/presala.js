const btnLogout = document.getElementById('btnCerrarSesion');
const btnRegistrarse = document.getElementById('btnRegistrarse');
const btnPresalas = document.getElementById('btnPresalas');
const btnHome = document.getElementById('btnHome');

if (btnHome) {
    btnHome.addEventListener('click', () => {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        //     window.location.href = '/cunca/inicio'
    })
}

if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        // const response = await fetch('http://localhost:1234/cunca/logout');
        // const data = await response.json()
        // console.log(data);
        // window.location.href = '/cunca/inicio'
    })
}

if (btnPresalas) {
    btnPresalas.addEventListener('click', () => {
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        // window.location.href = '/cunca/presalas'
    })
}