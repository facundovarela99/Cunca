import mysql from 'mysql2/promise'
import { config } from '../../config/config.js'

const connection = await mysql.createConnection(config);

export class PreSalaModel{
    static async ingresarJugador(idPresala, idJugador){
        
         
        const [info] =  await connection.query(
            `SELECT * FROM presalas_x_jugadores WHERE id_jugador = (?);`, [idJugador]
        )
        if (info.length === 0) {
            try{
                    await connection.query(
                        `INSERT INTO presalas_x_jugadores (id_presala, id_jugador) VALUES (?, ?);`, [idPresala, idJugador]
                    )
            
                    const jugadoresEnPresala = await connection.query(
                        `SELECT COUNT(*) AS cantidad_jugadores FROM presalas_x_jugadores WHERE id_presala = (?);`, [idPresala]
                    )
            
                    await connection.query(
                        `UPDATE presalas SET cantidad_jugadores = (?) WHERE id = (?);`, [jugadoresEnPresala[0][0].cantidad_jugadores, idPresala]
                    )
                    
                }catch(e){
                throw new Error(e.message);
            }
        }else{
            return
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
        return infoPresala;
    }

    static async salirPreSala(idPresala, idJugador){

        try{
            const [cantidadJugadores] = await connection.query(
                `SELECT cantidad_jugadores FROM presalas WHERE id = (?);`,[idPresala]
            )
            
            await connection.query(
                `UPDATE presalas SET cantidad_jugadores = (?) WHERE id =  (?)`,[cantidadJugadores[0].cantidad_jugadores-1, idPresala]
            )

            await connection.query(
                `DELETE FROM presalas_x_jugadores WHERE presalas_x_jugadores.id_presala = (?) AND presalas_x_jugadores.id_jugador = (?);`, [idPresala, idJugador]
            )
        }catch(e){
            throw new Error(e);
        }
    }
}