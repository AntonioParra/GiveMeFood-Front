export interface CuberiteHTTPResponse<T> {
    MESSAGE: string,
    STATE: string,
    TOKEN: string,
    DATA: T
}

export interface Usuario {
    IDUsuario?: number,
    apodo: string,
    nombre: string,
    apellido: string,
    email?: string
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
    valoracionUsuario: number,
    GMFRestaurantesTagsCollection: Tag[],
    GMFValoracionesCollection: Rating[]
}

export interface Tag {
    IDTag: number,
    nombreTag: string
}

export interface TipoTag {
    IDTipoTag:number,
    nombre: string
    GMFTagsCollection?: Tag[]
}

export interface Rating {
    IDUsuarioFK: number,
    IDValoraciones: number,
    valoracion: number
}