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

    buscar(username, password, admin){
        let tmp = this.first
        while(tmp != null){
            if(tmp.dato.username == username && tmp.dato.password == password && tmp.dato.admin == admin){
                return tmp
            }
            tmp = tmp.next
        }
        return null
    }

}