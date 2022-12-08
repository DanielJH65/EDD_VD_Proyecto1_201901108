import { NodoSimple } from "./nodoSimple.js"

export class Pila{

    constructor(){
        this.first = null
    }

    push(_dato){
        let newNodo = new NodoSimple(_dato)
        newNodo.next = this.first
        this.first = newNodo
    }

    pop(){
        if(this.first != null){
            this.first = this.first.next
        }
    }

    imprimir(){
        let tmp = this.first
        while(tmp != null){
            console.log(tmp.dato)
            tmp = tmp.next
        }
    }

}