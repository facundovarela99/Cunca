import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config({path: '../../.env'});

export function authenticationMiddleware(req, res, next){
    const token = req.cookies.access_token;
    req.session.user = null;
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.session.user = data;
    }catch(e){
        console.log('Error en el middleware de autenticación: ', e.message);
        
    }
    next();
}