import { NodoDoble } from "./nodoDoble.js"

export class ListaCircularDoble {
    constructor() {
        this.first = null
        this.tail = null
    }

    insertarInicio(_dato) {
        let newNodo = new NodoDoble(_dato)

        if (this.first == null) {
            this.first = newNodo
            this.tail = this.first
            this.first.prev = this.tail
            this.tail.next = this.first
        } else {
            newNodo.next = this.first
            newNodo.prev = this.tail
            this.first.prev = newNodo
            this.first = newNodo
            this.tail.next = this.first
        }
    }

    insertarFinal(_dato) {
        let newNodo = new NodoDoble(_dato)

        if (this.first == null) {
            this.first = newNodo
            this.tail = this.first
            this.first.prev = this.tail
            this.tail.next = this.first
        } else {
            this.tail.next = newNodo
            this.first.prev = newNodo
            newNodo.prev = this.tail
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

    graficar() {
        let dot = ""
        if (this.first != null) {
            let tmp = this.first
            while (tmp != this.tail) {
                dot += `Nodo${tmp.dato.nombre.replaceAll(' ', '')}[label="${tmp.dato.nombre}"];\n`
                dot += `Nodo${tmp.dato.nombre.replaceAll(' ', '')} -> Nodo${tmp.next.dato.nombre.replaceAll(' ', '')};\n`
                dot += `Nodo${tmp.dato.nombre.replaceAll(' ', '')} -> Nodo${tmp.prev.dato.nombre.replaceAll(' ', '')};\n`
                tmp = tmp.next
            }
            dot += `Nodo${tmp.dato.nombre.replaceAll(' ', '')}[label="${tmp.dato.nombre}"];\n`
            dot += `Nodo${tmp.dato.nombre.replaceAll(' ', '')} -> Nodo${tmp.next.dato.nombre.replaceAll(' ', '')};\n`
            dot += `Nodo${tmp.dato.nombre.replaceAll(' ', '')} -> Nodo${tmp.prev.dato.nombre.replaceAll(' ', '')};\n`
        }
        return dot
    }
}