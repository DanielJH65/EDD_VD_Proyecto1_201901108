import { NodoSimple } from "./nodoSimple.js"

export class ListaSimple{

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
        
        if(this.first == null){
            this.first = newNodo
        }else{
            while(tmp.next != null){
                tmp = tmp.next
            }
            tmp.next = newNodo
        }
    }

    imprimir(){
        let tmp = this.first
        while(tmp != null){
            console.log(tmp.dato)
            tmp = tmp.next
        }
    }

    buscarUser(username, password, admin){
        let tmp = this.first
        while(tmp != null){
            if(tmp.dato.username == username && tmp.dato.password == password && tmp.dato.admin == admin){
                return tmp
            }
            tmp = tmp.next
        }
        return null
    }

    graficarUser(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            dot += `Nodo${tmp.dato.dpi} [label = "${tmp.dato.dpi}\n${tmp.dato.username}\n${tmp.dato.name}\n${tmp.dato.password}\n${tmp.dato.phone}\n${tmp.dato.admin}"];\n`
            tmp = tmp.next
        }
        return dot
    }

    graficarConexionesUser(){
        let tmp = this.first
        let dot = ""
        while(tmp.next != null){
            dot += `Nodo${tmp.dato.dpi} -> Nodo${tmp.next.dato.dpi};\n`
            tmp = tmp.next
        }
        return dot
    }

}