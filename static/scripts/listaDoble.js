import { NodoDoble } from "./nodoDoble.js"

export class ListaDoble{
    
    constructor(){
        this.first = null
        this.tail = null
    }

    insertarInicio(_dato){
        let newNodo = new NodoDoble(_dato)

        if(this.first == null){
            this.first = newNodo
            this.tail = this.first
        }else{
            newNodo.next = this.first
            this.first = newNodo
            this.first.next.prev = this.first
        }
    }

    insertarFinal(_dato){
        let newNodo = new NodoDoble(_dato)
        let temp = this.first
        
        while(temp != null){
            if(temp.dato.nombre == _dato.nombre){
                return
            }
            temp = temp.next
        }

        if(this.first == null){
            this.first = newNodo
            this.tail = this.first
        }else{
            newNodo.prev = this.tail
            this.tail.next = newNodo
            this.tail = this.tail.next
        }
    }

    size(){
        let contador = 0
        let temp = this.first
        while(temp != null){
            contador++
            temp = temp.next
        }
        return contador
    }
    
    obtenern(_n){
        let contador = 0
        let temp = this.first
        while(temp != null){
            if(contador == _n){
                return temp
            }
            contador++
            temp = temp.next
        }
        return null
    }
}