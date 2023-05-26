export interface CuberiteHTTPResponse {
    MESSAGE: string,
    STATE: string,
    TOKEN: string
}

export interface HTTPLogin extends CuberiteHTTPResponse {
    DATA: Usuario
}

export interface HTTPFind extends CuberiteHTTPResponse {
    DATA: Restaurante[]
}

export interface HTTPGet extends CuberiteHTTPResponse {
    DATA: Restaurante
}

export interface Usuario {
    apodo: string,
    nombre: string,
    apellido: string,
    email: string
}

export interface Restaurante {
    IDRestaurante: number,
    cartaLink: string,
    coordenadaX: number,
    coordenadaY: number,
    direccion: string,
    googleMapLink: string,
    nombre: string,
    rangoPrecioMax: number,
    rangoPrecioMin: number
    valoracionMedia: number,
    valoraciones: number
}