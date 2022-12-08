import { NodoDoble } from "./nodoDoble.js"

export class Cola{

    constructor(){
        this.first = null
        this.tail = null
    }

    enqueue(_dato){
        let newNodo = new NodoDoble(_dato)

        if(this.first == null){
            this.first = newNodo
            this.tail = this.first
        }else{
            newNodo.prev = this.tail
            this.tail.next = newNodo
            this.tail = this.tail.next
        }
    }

    dequeue(){
        if(this.first != null){
            this.first = this.first.next
            this.first.prev = null
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