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
            let tmp = this.first
            while(tmp != null){
                if(tmp.dato.name == _dato.name){
                    return false
                }
                tmp = tmp.next
            }
            newNodo.next = this.first
            this.first = newNodo
            this.first.next.prev = this.first
        }
    }

    insertarValor(_cabecera, _dato){
        let tmp = this.first

        while(tmp != null){
            if(tmp.dato.name == _cabecera){
                tmp.lista.insertarFinal(_dato)
                break
            }
            tmp = tmp.next
        }
    }

    graficar(){
        let dot = this.graficarCabecera()
        dot+= this.graficarValores()
        return dot
    }

    graficarCabecera(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            dot += `Nodo${tmp.dato.name} [label = "${tmp.dato.name}\\n${tmp.dato.age}\\n${tmp.dato.country}", group = 1];\n`
            tmp = tmp.next
        }
        tmp = this.first
        while(tmp.next != null){
            dot += `Nodo${tmp.dato.name} -> Nodo${tmp.next.dato.name}\n`
            dot += `Nodo${tmp.next.dato.name} -> Nodo${tmp.dato.name}\n `
            tmp = tmp.next
        }
        return dot
    }

    graficarValores(){
        let tmp = this.first
        let dot = ""
        while(tmp != null){
            let tmpCanciones = tmp.lista.first
            let group = 2
            while(tmpCanciones != null){
                dot += `Nodo${tmpCanciones.dato.artista + tmpCanciones.dato.nombre} [label = "${tmpCanciones.dato.nombre}\\n${tmpCanciones.dato.duracion}\\n${tmpCanciones.dato.genero}", group = ${group}];\n`
                tmpCanciones = tmpCanciones.next
                group++
            }
            tmpCanciones = tmp.lista.first
            dot += `{rank = same;Nodo${tmp.dato.name};`
            group = 2
            while(tmpCanciones != null){
                dot += `Nodo${tmpCanciones.dato.artista + tmpCanciones.dato.nombre};`
                tmpCanciones = tmpCanciones.next
                group++
            }
            dot += "}\n"
            tmpCanciones = tmp.lista.first
            if(tmpCanciones != null){
                while(tmpCanciones.next != null){
                    dot += `Nodo${tmpCanciones.dato.artista + tmpCanciones.dato.nombre} -> Nodo${tmpCanciones.next.dato.artista + tmpCanciones.next.dato.nombre}\n`
                    dot += `Nodo${tmpCanciones.next.dato.artista + tmpCanciones.next.dato.nombre} -> Nodo${tmpCanciones.dato.artista + tmpCanciones.dato.nombre}\n`
                    tmpCanciones = tmpCanciones.next
                }
                dot += `Nodo${tmp.dato.name} -> Nodo${tmp.lista.first.dato.artista + tmp.lista.first.dato.nombre}\n`
                dot += `Nodo${tmp.lista.first.dato.artista + tmp.lista.first.dato.nombre} -> Nodo${tmp.dato.name}\n`
            }
            tmp = tmp.next
        }
        return dot
    }
}