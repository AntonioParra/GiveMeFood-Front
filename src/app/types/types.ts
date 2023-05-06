export interface HTTPLogin {
    MESSAGE: string,
    STATE: string,
    TOKEN: string,
    USUARIO: Usuario
}

export interface Usuario {
    apodo: string,
    nombre: string,
    apellido: string,
    email: string
}