import mysql from 'mysql2/promise'
import { config } from '../../config/config.js'

const connection = await mysql.createConnection(config);

export class PreSalaModel{
    static async ingresarJugador(idPresala, idJugador){
        await connection.query(
            `INSERT INTO presalas_x_jugadores (id_presala, id_jugador) VALUES (?, ?);`, [idPresala, idJugador]
        )

        const jugadoresEnPresala = await connection.query(
            `SELECT COUNT(*) AS cantidad_jugadores FROM presalas_x_jugadores WHERE id_presala = (?);`, [idPresala]
        )

        await connection.query(
            `UPDATE presalas SET cantidad_jugadores = (?) WHERE id = (?);`, [jugadoresEnPresala[0][0].cantidad_jugadores, idPresala]
        )
    }

    static async obtenerJugadoresPresalas(){
        const [cantidadJugadores] = await connection.query(
            `SELECT id, cantidad_jugadores FROM presalas;`
        )
        return cantidadJugadores;
    }

    static async obtenerInfoPresala(idPresala){
        const [infoPresala] = await connection.query(
            `SELECT p.id, p.cantidad_jugadores, j.nombre AS nombre_jugador FROM presalas p
            JOIN presalas_x_jugadores pj ON p.id = pj.id_presala
            JOIN jugadores j ON pj.id_jugador = j.id
            WHERE p.id = (?);`, [idPresala]
        )
        return infoPresala;
    }
}