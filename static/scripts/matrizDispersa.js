import { NodoHeaderMatrizDispersa, NodoMatrizDispersa } from "./nodosMatriz.js"

class Header{
    constructor() {
        this.head = null;
    }

    isEmpty() {
        return this.head == null;
    }

    getHeader(pos) {
        let aux = this.head;
        while (aux != null) {
            if (aux.pos == pos) return aux;
            aux = aux.next;
        }
        return null;
    }

    setHeader(node) {
        if (this.isEmpty()) {
            this.head = node;
        } else if (node.pos < this.head.pos) {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        } else {
            let aux = this.head;
            while (aux.next != null) {
                if (node.pos < aux.next.pos) {
                    node.next = aux.next;
                    aux.next.prev = node;
                    node.prev = aux;
                    aux.next = node;
                    break;
                }
                aux = aux.next;
            }

            if (aux.next == null) {
                aux.next = node;
                node.prev = aux;
            }
        }
    }
}

export class MatrizDispersa{
    constructor() {
        this.colsList = new Header();
        this.rowsList = new Header();
    }

    obtener(x, y){

        let columna = this.colsList.getHeader(y);
        let row = this.rowsList.getHeader(x);

        if(columna != null && row != null){
            let aux = columna.access

            while(aux != null){
                if(aux.x == x && aux.y == y){
                    return aux.dato
                }
                aux = aux.down
            }
        }
        return null
    }

    insertar(x, y, dato) {
        let cell = new NodoMatrizDispersa(x, y, dato);

        let columna = this.colsList.getHeader(y);
        let row = this.rowsList.getHeader(x);

        if(columna != null && row != null){
            let aux = columna.access

            while(aux != null){
                if(aux.x == x && aux.y == y){
                    aux.dato = dato
                    return
                }
                aux = aux.down
            }
        }

        if (columna == null) {
            columna = new NodoHeaderMatrizDispersa(y);
            this.colsList.setHeader(columna);
            columna.access = cell;
        } else if (x < columna.access.x) {
            cell.down = columna.access;
            columna.access.up = cell;
            columna.access = cell;
        } else {
            let aux = columna.access;
            while (aux.down != null) {
                if (x < aux.down.x) {
                    cell.down = aux.down;
                    aux.down.up = cell;
                    aux.down = cell;
                    cell.up = aux;
                    break;
                }
                aux = aux.down;
            }

            if (aux.down == null) {
                aux.down = cell;
                cell.up = aux;
            }
        }

        if (row == null) {
            row = new NodoHeaderMatrizDispersa(x);
            this.rowsList.setHeader(row);
            row.access = cell;
        } else if (y < row.access.y) {
            cell.next = row.access;
            row.access.prev = cell;
            row.access = cell;
        } else {
            let aux = row.access;
            while (aux.next != null) {
                if (y < aux.next.y) {
                    cell.next = aux.next;
                    aux.next.prev = cell;
                    aux.next = cell;
                    cell.prev = aux;
                    break;
                }
                aux = aux.next;
            }

            if (aux.next == null) {
                aux.next = cell;
                cell.up = aux;
            }
        }
    }

    configraph() {
        let xela = "";
        xela += "digraph G{ node[shape=component style=filled]\n" + "subgraph cluster_p{\n";
        xela += 'label = "Matriz DISPERSA"' + 'edge[dir = "both"];\n';

        xela += this.nodoX();
        xela += this.nodoY();
        
        xela += this.renderNodes();
        
        xela += this.ColbyR();
        xela += this.RowsbyR();

        xela += this.graphRanks();

        xela += "}}";
        return xela.toString();
    }

    nodoX() {
        let xela = "";
        let auxc = this.colsList.head;
        xela += "Mt -> C";
        xela += auxc.pos;
        xela += ";\n";

        while (auxc != null) {
            xela += "C";
            xela += auxc.pos;
            xela += `[label = "${auxc.pos}", group =`;
            xela += auxc.pos;
            xela += ", fillcolor=antiquewhite2 ];\n";

            if (auxc.next != null) {
                xela += "C";
                xela += auxc.pos;
                xela += " -> C";
                xela += auxc.next.pos;
                xela += ";\n";
            }
            auxc = auxc.next;
        }
        auxc = this.colsList.head;
        xela += "{ rank = same; Mt;";

        while (auxc != null) {
            xela += "C";
            xela += auxc.pos;
            xela += ";";

            auxc = auxc.next;
        }
        xela += "}\n";

        return xela.toString();
    }

    nodoY() {
        let xela = "";

        let auxr = this.rowsList.head;
        xela += "Mt -> F";
        xela += auxr.pos;
        xela += ";\n";

        while (auxr != null) {
            xela += "F";
            xela += auxr.pos;

            xela += `[label = "${auxr.pos}", group=1, fillcolor=antiquewhite2 ];\n`;

            if (auxr.next != null) {
                xela += "F";
                xela += auxr.pos;
                xela += " -> F";
                xela += auxr.next.pos;
                xela += ";\n";
            }
            auxr = auxr.next;
        }
        return xela.toString();
    }

    renderNodes() {
        let xela = "";
        let auxc = this.colsList.head;
        while (auxc != null) {
            let aux = auxc.access;
            while (aux != null) {
                xela += "X";
                xela += aux.x;
                xela += "Y";
                xela += aux.y;
                xela += '[label="';
                xela += aux.dato.song;
                xela += '", group=';
                xela += aux.y;
                xela += "];\n";

                aux = aux.down;
            }
            auxc = auxc.next;
        }
        return xela.toString();
    }

    ColbyR() {
        let xela = "";
        let xela2 = "";
        let auxc = this.colsList.head;
        while (auxc != null) {
            if (auxc.access != null) {
                xela += "C";
                xela += auxc.pos;
                xela += " -> ";
                xela += "X";
                xela += auxc.access.x;
                xela += "Y";
                xela += auxc.access.y;
                xela += ";\n";
            }
            let aux = auxc.access;
            while (aux != null) {
                if (aux.down != null) {
                    xela2 += "X";
                    xela2 += aux.x;
                    xela2 += "Y";
                    xela2 += aux.y;
                    xela2 += " -> ";
                    xela2 += "X";
                    xela2 += aux.down.x;
                    xela2 += "Y";
                    xela2 += aux.down.y;
                    xela2 += ";\n";
                }
                aux = aux.down;
            }
            auxc = auxc.next;
        }
        xela += xela2;
        return xela.toString();
    }

    RowsbyR() {
        let xela = "";
        let xela2 = "";
        let auxr = this.rowsList.head;
        while (auxr != null) {
            if (auxr.access != null) {
                xela += "F";
                xela += auxr.pos;
                xela += " -> ";
                xela += "X";
                xela += auxr.access.x;
                xela += "Y";
                xela += auxr.access.y;
                xela += ";\n";
            }
            let aux = auxr.access;
            while (aux != null) {
                if (aux.next != null) {

                    xela2 += "X";
                    xela2 += aux.x;
                    xela2 += "Y";
                    xela2 += aux.y;
                    xela2 += " -> ";
                    xela2 += "X";
                    xela2 += aux.next.x;
                    xela2 += "Y";
                    xela2 += aux.next.y;
                    xela2 += ";\n";
                }
                aux = aux.next;
            }
            auxr = auxr.next;
        }
        xela += xela2;
        return xela.toString();
    }

    graphRanks() {
        let xela = "";
        let auxr = this.rowsList.head;
        while (auxr != null) {
            xela += "{ rank = same; F";
            xela += auxr.pos;
            xela += ";";

            let aux = auxr.access;
            while (aux != null) {
                xela += "X";
                xela += aux.x;
                xela += "Y";
                xela += aux.y;
                xela += ";";

                aux = aux.next;
            }
            xela += "}\n";

            auxr = auxr.next;
        }
        return xela.toString();
    }
}