import z from 'zod'

const userSchema = z.object({
    nombre: z.string({
        invalid_type_error: 'El nombre debe ser una cadena.',
        required_error: 'El nombre es obligatorio'
    }).min(3, 'El nombre no debe poseer menos de tres caracteres'),
    apellido: z.string({
        invalid_type_error: 'El apellido debe ser una cadena.',
        required_error: 'El apellido es obligatorio'
    }).min(3, 'El apellido no debe poseer menos de tres caracteres'),
    username: z.string()
    .trim()
    .min(8, 'El nombre de usuario debe tener 8 caracteres como mínimo')
    .max(20, 'El nombre de usuario debe tener 20 caracteres como máximo')
    .regex(/^[a-zA-Z0-9_]+$/, 'Nombre de usuario inválido'),
    correo: z.string({
        invalid_type_error: 'El correo debe ser una cadena.',
        required_error: 'El correo es obligatorio'
    }).email(),
    contrasenia: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, {message: "La contraseña no debe exceder los 20 caracteres"})
    .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    .regex(/[^A-Za-z0-9]/, { message: "La contraseña debe contener al menos un caracter especial" }),
})

const passwordSchema = z.object({
    contrasenia: z.string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, {message: "La contraseña no debe exceder los 20 caracteres"})
    .regex(/[A-Z]/, { message: "Debe contener al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Debe contener al menos una letra minúscula" })
    .regex(/[0-9]/, { message: "Debe contener al menos un número" })
    .regex(/[^A-Za-z0-9]/, { message: "Debe contener al menos un caracter especial" })
})

export function validarNuevoUsuario(object){
    return userSchema.safeParse(object); //safeParse devuelve un objeto result que indica si hay un error o hay datos, siendo mas facil validarlo con un if
}

export function validarUsuarioParcial(object){
    return userSchema.partial().safeParse(object);
}

export function validarNuevaContrasenia(object){
    return passwordSchema.safeParse(object);
}