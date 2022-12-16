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

    graficar(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            dot += `Nodo${tmp.dato.username}[label = "${tmp.dato.dpi}\\n${tmp.dato.username}\\n${tmp.dato.name}\\n${tmp.dato.password}\\n${tmp.dato.phone}"];\n`
            if(tmp.next != null){
                dot+= `Nodo${tmp.dato.username} -> Nodo${tmp.next.dato.username}\n`
            }
            tmp = tmp.next
        }
        return dot
    }

}