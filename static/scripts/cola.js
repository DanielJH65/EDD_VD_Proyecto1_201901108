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

    buscarUser(_username){
        let tmp = this.first
        while(tmp != null){
            if(tmp.dato.username == _username){
                return tmp
            }
            tmp = tmp.next
        }
        return null
    }

    imprimir(){
        let tmp = this.first
        while(tmp != null){
            console.log(tmp.dato)
            tmp = tmp.next
        }
    }

    obtenern(_n){
        let tmp = this.first
        if(tmp != null && _n <= this.size()){
            for (let index = 0; index < _n; index++) {
                tmp = tmp.next
            }
            return tmp.dato
        }
    }

    size(){
        let tmp = this.first
        let size = 0
        while(tmp != null){
            size++
            tmp = tmp.next
        }
        return size
    }

    graficar(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            dot += `Nodo${tmp.dato.username}[label = "${tmp.dato.dpi}\\n${tmp.dato.username}\\n${tmp.dato.name}\\n${tmp.dato.password}\\n${tmp.dato.phone}"];\n`
            if(tmp.next != null){
                dot+= `Nodo${tmp.dato.username} -> Nodo${tmp.next.dato.username}\n`
                dot+= `Nodo${tmp.next.dato.username} -> Nodo${tmp.dato.username}\n`
            }
            tmp = tmp.next
        }
        return dot
    }
}