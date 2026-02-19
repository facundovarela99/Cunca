import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from "url";
import { PreSalaModel } from '../models/mysql/presala.js';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../env') });

export class PreSalaController{

    static async presalaPage(req, res){
        const token = req.cookies.access_token
        if (!token) {
            return res.render('index');
        } else{
            const cantidadJugadoresPresalas = await PreSalaModel.obtenerJugadoresPresalas();
            console.log(cantidadJugadoresPresalas)
            return res.render('presalas', {data: cantidadJugadoresPresalas});
        }
    }


    static async presala(req, res){
        const idPresala = req.params.id;
        console.log('id pre sala: ', idPresala)
        const token = req.cookies.access_token;
        if (!token) {
            return res.render('index');
        }
        try{
            const jugador = jwt.verify(token, process.env.JWT_SECRET);
            const resultadoIngreso = await PreSalaModel.ingresarJugador(idPresala, jugador.id);
            const presala = await PreSalaModel.obtenerInfoPresala(idPresala);
            if (resultadoIngreso === jugador.id) {
                res.render(`presala${idPresala}`, {dataPresala: presala, data:true});
            }
            res.render(`presala${idPresala}`, {dataPresala: presala, data:false});
        }catch(e){
            const newError = {}
            newError['message'] = e.message
            res.render('presala1', {
                error: [newError],
                data:e.message
            })
        }
    }
}