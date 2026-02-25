import { socket } from './utils/socket.js';

socket.on('presala', (presala) => {
    console.log('Jugador recibido en el front: ', presala);
    const jugadorEnSala = presala.jugadores.some(j => j.id_jugador === presala.jugador[0].id_jugador);
    console.log('Jugador en sala: ', jugadorEnSala);
    if (!jugadorEnSala) {
        const jugador = presala.jugador[0];
        const divJugador = document.createElement('div');
        divJugador.innerHTML=`<h2>Nombre jugador: ${jugador.nombre_jugador}</h2>`
        document.querySelector('.nombresJugadores').appendChild(divJugador);
    }
})

socket.on('presalaMenosUno', (presala)=>{
    console.log('presalaMenosUno recibida en el front: ', presala);
    const nombresJugadores = document.querySelector('.nombresJugadores');
    nombresJugadores.innerHTML = '';
    presala.forEach(jugador=>{
        const divJugador = document.createElement('div');
        divJugador.innerHTML = `<h2>Nombre jugador: ${jugador.nombre_jugador}</h2>`;
        nombresJugadores.appendChild(divJugador);
    })
})

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