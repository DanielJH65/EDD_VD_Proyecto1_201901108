import { NodoListas } from "./nodoListas.js"

export class ListaListas{

    constructor(){
        this.first = null
    }

    insertarCabecera(_dato){
        let newNodo = new NodoListas(_dato)

        if(this.first == null){
            this.first = newNodo
            this.tail = this.first
        }else{
            newNodo.next = this.first
            this.first = newNodo
            this.first.next.prev = this.first
        }
    }

    insertarValor(_cabecera, _dato){
        let tmp = this.first

        while(tmp != null){
            if(tmp.dato == _cabecera){
                tmp.lista.insertarFinal(_dato)
                break
            }
            tmp = tmp.next
        }
    }

}