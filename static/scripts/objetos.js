import { Pila } from "./pila.js"
import { Cola } from "./cola.js"
import { ListaCircularDoble } from "./listaCircularDoble.js"
export class Usuario {
    constructor(_dpi, _name, _username, _password, _phone, _admin) {
        this.dpi = _dpi
        this.name = _name
        this.username = _username
        this.password = _password
        this.phone = _phone
        this.admin = _admin
        this.friends = new Pila()
        this.bloqueados = new Cola()
        this.playList = new ListaCircularDoble()
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

export class Programada{
    constructor(_month, _day, _song, _artist){
        this.month = _month
        this.day = _day
        this.song = _song
        this.artist = _artist
    }
}

export class Podcast {
    constructor(_name, _topic, _guests, _duration){
        this.name = _name
        this.topic = _topic
        this.guests = _guests
        this.duration = _duration
    }
}