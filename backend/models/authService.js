import bcrypt from 'bcrypt'
import { User } from './mysql/user.js'

export class AuthService{
    static async crear(input){
        const hash = await bcrypt.hash(input.contrasenia, 10);
        console.log('clave hasheada: ', hash);
        return await User.crearUsuario({...input, contrasenia: hash})
    }

    static async login(input){
        let usuario;
        console.log(input);
        if (input.username.includes('@')) {
            usuario = await User.buscarPorCorreo(input.username)
        }else{
            usuario = await User.buscarPorUsername(input.username)
        }
        if (usuario.length === 0) throw new Error('Nombre de usuario inexistente');

        const isValid = await bcrypt.compare(input.contrasenia, usuario[0].contrasenia);
        if (!isValid) throw new Error('Contraseña incorrecta.');
        return usuario;
    }
}