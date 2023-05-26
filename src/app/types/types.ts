export interface CuberiteHTTPResponse<T> {
    MESSAGE: string,
    STATE: string,
    TOKEN: string,
    DATA: T
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