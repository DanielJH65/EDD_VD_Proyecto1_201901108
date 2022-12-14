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
            dot += `Nodo${tmp.dato.name.replaceAll(' ','')} [label = "${tmp.dato.name}\\n${tmp.dato.age}\\n${tmp.dato.country}", group = 1];\n`
            tmp = tmp.next
        }
        tmp = this.first
        while(tmp.next != null){
            dot += `Nodo${tmp.dato.name.replaceAll(' ','')} -> Nodo${tmp.next.dato.name.replaceAll(' ','')}\n`
            dot += `Nodo${tmp.next.dato.name.replaceAll(' ','')} -> Nodo${tmp.dato.name.replaceAll(' ','')}\n `
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
                dot += `Nodo${tmpCanciones.dato.artista.replaceAll(' ','') + tmpCanciones.dato.nombre.replaceAll(' ','')} [label = "${tmpCanciones.dato.nombre}\\n${tmpCanciones.dato.duracion}\\n${tmpCanciones.dato.genero}", group = ${group}];\n`
                tmpCanciones = tmpCanciones.next
                group++
            }
            tmpCanciones = tmp.lista.first
            dot += `{rank = same;Nodo${tmp.dato.name.replaceAll(' ','')};`
            group = 2
            while(tmpCanciones != null){
                dot += `Nodo${tmpCanciones.dato.artista.replaceAll(' ','') + tmpCanciones.dato.nombre.replaceAll(' ','')};`
                tmpCanciones = tmpCanciones.next
                group++
            }
            dot += "}\n"
            tmpCanciones = tmp.lista.first
            if(tmpCanciones != null){
                while(tmpCanciones.next != null){
                    dot += `Nodo${tmpCanciones.dato.artista.replaceAll(' ','') + tmpCanciones.dato.nombre.replaceAll(' ','')} -> Nodo${tmpCanciones.next.dato.artista.replaceAll(' ','') + tmpCanciones.next.dato.nombre.replaceAll(' ','')}\n`
                    dot += `Nodo${tmpCanciones.next.dato.artista.replaceAll(' ','') + tmpCanciones.next.dato.nombre.replaceAll(' ','')} -> Nodo${tmpCanciones.dato.artista.replaceAll(' ','') + tmpCanciones.dato.nombre.replaceAll(' ','')}\n`
                    tmpCanciones = tmpCanciones.next
                }
                dot += `Nodo${tmp.dato.name.replaceAll(' ','')} -> Nodo${tmp.lista.first.dato.artista.replaceAll(' ','') + tmp.lista.first.dato.nombre.replaceAll(' ','')}\n`
                dot += `Nodo${tmp.lista.first.dato.artista.replaceAll(' ','') + tmp.lista.first.dato.nombre.replaceAll(' ','')} -> Nodo${tmp.dato.name.replaceAll(' ','')}\n`
            }
            tmp = tmp.next
        }
        return dot
    }

    size(){
        let size2 = 0
        let temp = this.first
        while(temp != null){
            let tempCanciones = temp.lista.first
            while(tempCanciones != null){
                size2++
                tempCanciones = tempCanciones.next
            }
            temp = temp.next
        }
        return size2
    }

    obtenerArtista(nombre){
        let temp = this.first
        while(temp != null){
            if(temp.dato.name == nombre) return temp
            temp = temp.next
        }
        return null
    }

    obtenern(_n){
        let contador = 0
        let temp = this.first
        while(temp != null){
            let tempCanciones = temp.lista.first
            while(tempCanciones != null){
                if(contador == _n){
                    return tempCanciones.dato
                }
                contador++
                tempCanciones = tempCanciones.next
            }
            temp = temp.next
        }
        return null
    }
}