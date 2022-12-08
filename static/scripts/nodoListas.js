import { ListaDoble } from "./listaDoble.js"

export class NodoListas{

    constructor(_dato){
        this.dato = _dato
        this.lista = new ListaDoble()
        this.next = null
        this.prev = null
    }
    
}