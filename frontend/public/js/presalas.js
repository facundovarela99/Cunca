import { socket } from "./utils/socket.js";


socket.on('cantidad', (cantidad) => {
    console.log('Cantidad recibida en el front: ', cantidad);
    for (const presala of cantidad) {
        document.getElementById(`cantidadJugadores-${presala.id}`).innerHTML = `Cantidad jugadores: ${presala.cantidad_jugadores}`;
    }
})

const btnSalas = document.querySelectorAll('.btnSala');

btnSalas.forEach(btn => {
    btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        window.location.href = `/cunca/presala/${id}`

    })
})