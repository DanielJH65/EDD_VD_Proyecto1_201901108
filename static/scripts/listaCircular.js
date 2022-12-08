import { NodoSimple } from "./nodoSimple.js"

export class ListaCircular {

    constructor() {
        this.first = null
        this.tail = null
    }

    insertarInicio(_dato) {
        let newNodo = new NodoSimple(_dato)

        if (this.first == null) {
            this.first = newNodo
            this.tail = this.first
        } else {
            newNodo.next = this.first
            this.first = newNodo
            this.tail.next = this.first
        }
    }

    insertarFinal(_dato) {
        let newNodo = new NodoSimple(_dato)

        if (this.first == null) {
            this.first = newNodo
            this.tail = this.first
        } else {
            this.tail.next = newNodo
            this.tail = newNodo
            this.tail.next = this.first
        }
    }

    imprimir() {
        if (this.first != null) {
            let tmp = this.first
            while (tmp != this.tail) {
                console.log(tmp.dato)
                tmp = tmp.next
            }
            console.log(tmp.dato)
        }
    }
}