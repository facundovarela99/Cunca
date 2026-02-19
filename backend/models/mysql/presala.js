import mysql from 'mysql2/promise'
import { config } from '../../config/config.js'

const connection = await mysql.createConnection(config);

export class PreSalaModel{
    static async ingresarJugador(idPresala, idJugador){
        
        try{
            const [infoPresala] = await connection.query(
            `SELECT p.id AS id_presala, j.id AS id_jugador, j.nombre AS nombre_jugador FROM presalas p
            JOIN presalas_x_jugadores pj ON p.id = pj.id_presala
            JOIN jugadores j ON pj.id_jugador = j.id
            WHERE p.id = (?);`, [idPresala]
            )

            const jugadorEnPresala = infoPresala.some(jugador => jugador.id_jugador === idJugador);
            if (jugadorEnPresala) {
                return idJugador;
            } else{
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


            return true;
        }catch(e){
            throw new Error(e.message);
        }
    }

    static async obtenerJugadoresPresalas(){
        const [cantidadJugadores] = await connection.query(
            `SELECT id, cantidad_jugadores FROM presalas;`
        )
        return cantidadJugadores;
    }

    static async obtenerInfoPresala(idPresala){
        const [infoPresala] = await connection.query(
            `SELECT p.id AS id_presala, j.id AS id_jugador, j.nombre AS nombre_jugador FROM presalas p
            JOIN presalas_x_jugadores pj ON p.id = pj.id_presala
            JOIN jugadores j ON pj.id_jugador = j.id
            WHERE p.id = (?);`, [idPresala]
        )
        console.log('Info presala obtenida: ', infoPresala)
        return infoPresala;
    }
}