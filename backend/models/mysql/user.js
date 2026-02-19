import mysql from 'mysql2/promise'
import { config } from "../../config/config.js";

const connection = await mysql.createConnection(config);

export class User{
    static async crearUsuario(input){

        try{

            await connection.query(
                `INSERT INTO jugadores (username, contrasenia, nombre, apellido, correo) VALUES (?,?,?,?,?);`,
                [input.username, input.contrasenia, input.nombre, input.apellido, input.correo]
            )
        }catch(e){
            console.log('Error en modelo User método createUser')
            throw new Error(e);
        }
        const [nuevoUsuario] = await connection.query(
            `SELECT * FROM jugadores WHERE username = (?);`, [input.username]
        )
        return nuevoUsuario
    }

    static async buscarPorUsername(username){
        try{
            const [usuario] = await connection.query(
                `SELECT id, username, contrasenia FROM jugadores WHERE username = (?);`, [username]
            )
            return usuario;
        }catch(e){
            throw new Error(e);
        }
    }
    
    static async buscarPorCorreo(correo){
        try{
            const [usuario] = await connection.query(
                `SELECT id, username, contrasenia FROM jugadores WHERE correo = (?);`, [correo]
            )
            console.log('Usuario traído de la base: ', usuario)
            return usuario;
        }catch(e){
            throw new Error(e);
        }
    }
}