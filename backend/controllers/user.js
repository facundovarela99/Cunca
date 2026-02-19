import { User } from "../models/mysql/user.js";
import { validarNuevoUsuario } from "../schemas/userSchema.js";
import { AuthService } from "../models/authService.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from "url";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../env') });


export class UserController{
    static async index(req, res){
        const token = req.cookies.access_token;
        if (!token) {
            return res.render('index');
        }
        try{
            const data = jwt.verify(token, process.env.JWT_SECRET);
            console.log('data en index: ', data);
            res.render('home', {data: data});
        }catch(e){
            const data = undefined;
            res.render('index', {data: data});
        }
    }

    static async home(req, res){
        const token = req.cookies.access_token;
        if (!token) {
            return res.render('index');
        }
        try{
            const data = jwt.verify(token, process.env.JWT_SECRET);
            res.render('home', {data: data});
        }catch(e){
            const data = undefined;
            res.render('index', {data: data});
        }
    }

    static pageRegistro(req, res){
        return res.render('registro');
    }

    static async register(req, res){
        try{
            const dataUsuarioValidada  = validarNuevoUsuario(req.body);
            if (dataUsuarioValidada.error){
                // return res.status(400).json({ error: JSON.parse(dataUsuarioValidada.error.message) })
                res.json({error: JSON.parse(dataUsuarioValidada.error.message)})
                
            }
            const [nuevoUsuario] = await AuthService.crear(dataUsuarioValidada.data);
            const token = jwt.sign({id: nuevoUsuario.id, username: nuevoUsuario.username}, process.env.JWT_SECRET, {
                expiresIn: '120m',
            });
            res
            .cookie('access_token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 60
                })
                .status(201)
                .json({message: 'Registro exitoso'})
        }catch(e){
            console.log(`Error al crear el usuario:\n ${e.message}`)
            const newError = {}
            newError['message'] = e.message
            res.json({
                error: [newError]
            })
        }
        
    }

    static async login(req, res){
        try{
            const {username, contrasenia} = req.body;
            const [jugador] = await AuthService.login({username, contrasenia})
            const token = jwt.sign({id: jugador.id, username: jugador.username}, process.env.JWT_SECRET, {
                expiresIn: '120m',
            });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: false, //cambiar a true cuando la cookie se envie por https
                sameSite: 'lax', //lax para desarrollo, strict para producción
                maxAge: 1000 * 60 * 60
            })
              .status(201)
              .json({message: 'Login exitoso'})
        }catch(e){
            console.log(e);
            const newError={}
            newError['message'] = e.message
            res.json({
                error: [newError]
            })
        }
    }

    static logout(req, res){
        res.clearCookie('access_token').json({message:'Has cerrado sesión exitosamente'})
    }
}