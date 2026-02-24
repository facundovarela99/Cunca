import { socket } from "./utils/socket.js";


socket.on('cantidad', ({id, cantidad}) => {
    document.getElementById(`cantidadJugadores-${id}`).innerHTML = `Cantidad jugadores: ${cantidad}`;
})

const btnSalas = document.querySelectorAll('.btnSala');

btnSalas.forEach(btn => {
    btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        window.location.href = `/cunca/presala/${id}`

    })
})