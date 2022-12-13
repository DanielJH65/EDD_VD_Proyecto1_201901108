export class NodoMatrizDispersa{
    constructor(_x, _y, _dato){
        this.next = null
        this.prev = null
        this.up = null
        this.down = null

        this.x = _x
        this.y = _y
        this.dato = _dato
    }
}

export class NodoHeaderMatrizDispersa{
    constructor(_pos){
        this.next = null
        this.prev = null

        this.access = null

        this.pos = _pos
    }
}