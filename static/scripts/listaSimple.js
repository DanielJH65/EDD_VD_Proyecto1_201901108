import { NodoSimple } from "./nodoSimple.js"

export class listaSimple{

    constructor(){
        this.first = null
    }

    insertarInicio(_dato){
        let newNodo = new NodoSimple(_dato)
        newNodo.next = this.first
        this.first = newNodo
    }

    insertarFinal(_dato){
        let newNodo = new NodoSimple(_dato)
        let tmp = this.first
        this.first = newNodo
    }

    imprimir(){
        let tmp = this.first
        while(tmp != null){
            console.log(tmp.dato)
            tmp = tmp.next
        }
    }

}