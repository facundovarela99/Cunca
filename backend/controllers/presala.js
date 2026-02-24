import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from "url";
import { PreSalaModel } from '../models/mysql/presala.js';
import { io } from '../app.js';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../env') });

export class PreSalaController{

    static async presalasPage(req, res){
        const {user} = req.session
        if (!user) {
            return res.render('index');
        } else{
            const cantidadJugadoresPresalas = await PreSalaModel.obtenerJugadoresPresalas();
            console.log('Info de las presalas,  al entrar a presalas page: ', cantidadJugadoresPresalas)
            return res.render('presalas', {data: cantidadJugadoresPresalas});
        }
    }


    static async presala(req, res){
        const idPresala = req.params.id;
        const {user} = req.session;
        console.log('USER EN PRESALA: ', user)
        if (!user) {
            return res.render('index');
        }
        try{
            await PreSalaModel.ingresarJugador(idPresala, user.id);
            const presala = await PreSalaModel.obtenerInfoPresala(idPresala);
            io.emit('cantidad', {id:idPresala, cantidad:presala.length});
            res.render(`presala${idPresala}`, {dataPresala: presala, data:true});
        }catch(e){
            const newError = {}
            newError['message'] = e.message
            res.render('presala1', {
                error: [newError],
                data:e.message
            })
        }
    }

    static async salirPresala(req, res){
        const idPresala = req.params.id;
        console.log('idPresala: ', idPresala)
        const {user} = req.session
        if (!user) {
            return res.render('index');
        }
        try{
            await PreSalaModel.salirPreSala(idPresala, user.id);
            const cantidadJugadoresPresalas = await PreSalaModel.obtenerJugadoresPresalas();
            const infoPresala = await PreSalaModel.obtenerInfoPresala(idPresala);
            console.log('infoPresala al salir: ', infoPresala);
            console.log('cantidadJugadoresPresalas al salir: ', cantidadJugadoresPresalas);
            (infoPresala.length<0)
            ? io.emit('cantidad', {id:idPresala, cantidad:0})
            : io.emit('cantidad', {id:idPresala, cantidad:infoPresala.length})
            console.log('cantidad: ', infoPresala.length)
            return res.render('presalas', {data: cantidadJugadoresPresalas});
        }catch(e){
            throw new Error(e);
        }
    }
}