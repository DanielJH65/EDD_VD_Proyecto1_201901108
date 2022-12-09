export class Usuario {
    constructor(_dpi, _name, _username, _password, _phone, _admin) {
        this.dpi = _dpi
        this.name = _name
        this.username = _username
        this.password = _password
        this.phone = _phone
        this.admin = _admin
    }
}

export class Artista {
    constructor(_name, _age, _country) {
        this.name = _name
        this.country = _country
        this.age = _age
    }
}

export class Cancion {
    constructor(_artista, _nombre, _duracion, _genero){
        this.nombre = _nombre
        this.artista = _artista
        this.duracion = _duracion
        this.genero = _genero
    }
}