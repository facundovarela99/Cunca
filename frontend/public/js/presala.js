

const btnLogout = document.getElementById('btnCerrarSesion');
const btnPresalas = document.getElementById('btnPresalas');
const btnHome = document.getElementById('btnHome');
const btnSalirPresala = document.getElementById('btnSalirPresala');

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
        const idPresala = btnLogout.getAttribute('data-id');
        await fetch(`http://localhost:1234/cunca/salir/presala/${idPresala}`)
        await fetch('http://localhost:1234/cunca/logout');
        window.location.href = '/cunca/inicio'
    })
}

if (btnPresalas) {
    btnPresalas.addEventListener('click', () => {
        Swal.fire({
            title: "¿Desea abandonar la sala?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Salir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const idPresala = btnSalirPresala.getAttribute('data-id');
                await fetch(`http://localhost:1234/cunca/salir/presala/${idPresala}`)
                window.location.href = '/cunca/presalas'
            }
        });
    })
}

btnSalirPresala.addEventListener('click', async () => {
    Swal.fire({
        title: "¿Desea abandonar la sala?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Salir",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            const idPresala = btnSalirPresala.getAttribute('data-id');
            await fetch(`http://localhost:1234/cunca/salir/presala/${idPresala}`)
            window.location.href = '/cunca/presalas'
        }
    });
})