import "./js-sha256.js"
import { Usuario, Artista, Cancion, Podcast, Programada } from "./objetos.js"
import { ListaSimple } from "./listaSimple.js"
import { ListaListas } from "./listaListas.js"
import { ArbolBB } from "./arbolBB.js"
import { MatrizDispersa } from "./matrizDispersa.js"

// Secciones para mostrar y ocultar

const loginSection = document.getElementById("login")
const signinSection = document.getElementById("signin")
const adminSection = document.getElementById("admin")
const userSection = document.getElementById("user")
const userFriendsConten = document.getElementById("friendsContent")
const bloqueadosFriendsContent = document.getElementById("bloqueadosContent")

export function hideLogin() {
    loginSection.setAttribute("class", "bg-gray-800 min-h-screen hidden items-center justify-center")
}

export function showLogin() {
    loginSection.setAttribute("class", "bg-gray-800 min-h-screen flex items-center justify-center")
}

export function showSignin() {
    signinSection.setAttribute("class", "bg-gray-800 min-h-screen flex items-center justify-center")
}

export function hideSignin() {
    signinSection.setAttribute("class", "bg-gray-800 min-h-screen hidden items-center justify-center")
}

export function showAdmin() {
    adminSection.setAttribute("class", "block")
}

export function hideAdmin() {
    adminSection.setAttribute("class", "hidden")
}

export function showUser() {
    userSection.setAttribute("class", "block")
}

export function hideUser() {
    userSection.setAttribute("class", "hidden")
}

export function showUserFriendsContent(){
    userFriendsConten.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideUserFriendsContent(){
    userFriendsConten.setAttribute("class", "bg-gray-400 hidden items-center justify-center")
}

export function showBloqueadosContent(){
    bloqueadosFriendsContent.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideBloqueadosContent(){
    bloqueadosFriendsContent.setAttribute("class", "bg-gray-400 hidden flex-col items-center justify-center")
}

// Estructuras

export const usuarios = new ListaSimple()
export const artistasCanciones = new ListaListas()
export const podcasts = new ArbolBB()
export const programada = new MatrizDispersa()

export let usuarioActual

usuarios.insertarFinal(new Usuario(2654568452521, "Oscar Armin", "EDD", sha256("123"), "+502 (123) 123-4567", true))

//Login

export function login(e) {
    const username = document.getElementById("usernamelogin")
    const password = document.getElementById("passwordlogin")
    const admin = document.getElementById("adminlogin")

    usuarioActual = usuarios.buscarUser(username.value, sha256(password.value), admin.checked)

    if (usuarioActual != null) {
        hideLogin()
        if (usuarioActual.dato.admin) {
            showAdmin()
        } else {
            showUser()
        }
    } else {
        Swal.fire('Oops...', 'Usuario o contraseña incorrectos', 'warning')
    }

    e.preventDefault()

    username.value = ""
    password.value = ""
    admin.checked = false

}

// Signin

export function signin(e) {
    const username = document.getElementById("usernamesignin")
    const password = document.getElementById("passwordsignin")
    const name = document.getElementById("namesignin")
    const dpi = document.getElementById("dpisignin")
    const tel = document.getElementById("telsignin")

    if(usuarios.insertarFinal(new Usuario(dpi.value, name.value, username.value, sha256(password.value), tel.value, false))){        
        Swal.fire('Perfecto...', 'Usuario registrado', 'success')
    }else{
        Swal.fire('Oops...', 'Dpi o nombre de usuario ya registrados', 'error')
    }

    e.preventDefault();

    username.value = ""
    password.value = ""
    name.value = ""
    dpi.value = ""
    tel.value = ""
}

//Admin

export function ingresarUsuarios(){

    Swal.fire({
        title: 'Carga masiva de usuarios',
        html: `<input type="file" id="fileUser" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileuser = Swal.getPopup().querySelector('#fileUser').files[0]
            return fileuser
        }
    }).then((result) =>{
        const reader = new FileReader()

        reader.addEventListener("load", ()=>{
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                usuarios.insertarFinal(new Usuario(user.dpi, user.name, user.username, sha256(user.password), user.phone, user.admin))
                Swal.fire("Registrados...",'Carga masiva realizada', 'success')
            });
        })

        reader.readAsText(result.value)
    })
}

export function graficarUsuarios(){
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += usuarios.graficarUser()
    dot += usuarios.graficarConexionesUser()
    dot += "rankdir= LR;\n}\n"

    if(document.getElementById("imgAdmin")){
        document.getElementById("imgAdmin").remove()
    }
    if(document.querySelector("svg")){
        document.querySelector("svg").setAttribute("class","hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}

export function ingresarArtistas(){

    Swal.fire({
        title: 'Carga masiva de artistas',
        html: `<input type="file" id="fileArtistas" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileartist = Swal.getPopup().querySelector('#fileArtistas').files[0]
            return fileartist
        }
    }).then((result) =>{
        const reader = new FileReader()

        reader.addEventListener("load", ()=>{
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                artistasCanciones.insertarCabecera(new Artista(user.name, user.age, user.country))
            });
            Swal.fire("Registrados...",'Carga masiva realizada', 'success')
        })

        reader.readAsText(result.value)
    })
}

export function ingresarCanciones(){

    Swal.fire({
        title: 'Carga masiva de canciones',
        html: `<input type="file" id="fileCanciones" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const filesongs = Swal.getPopup().querySelector('#fileCanciones').files[0]
            return filesongs
        }
    }).then((result) =>{
        const reader = new FileReader()

        reader.addEventListener("load", ()=>{
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                artistasCanciones.insertarValor(user.artist, new Cancion(user.artist, user.name, user.duration, user.gender))
                Swal.fire("Registradas...",'Carga masiva realizada', 'success')
            });
        })

        reader.readAsText(result.value)
    })
}

export function graficarArtistasCanciones(){
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += artistasCanciones.graficar()
    dot += "}\n"

    if(document.getElementById("imgAdmin")){
        document.getElementById("imgAdmin").remove()
    }
    if(document.querySelector("svg")){
        document.querySelector("svg").setAttribute("class","hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}

export function ingresarProgramadas(){
    Swal.fire({
        title: 'Carga masiva de música programada',
        html: `<input type="file" id="fileProgramada" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileProgramada = Swal.getPopup().querySelector('#fileProgramada').files[0]
            return fileProgramada
        }
    }).then((result) =>{
        const reader = new FileReader()

        reader.addEventListener("load", ()=>{
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                programada.insertar(user.month, user.day, new Programada(user.month, user.day, user.song, user.artist))
                Swal.fire("Registrados...",'Carga masiva realizada', 'success')
            });
        })
        reader.readAsText(result.value)
    })
}

export function graficarProgramadas(){
    if(document.getElementById("imgAdmin")){
        document.getElementById("imgAdmin").remove()
    }
    if(document.querySelector("svg")){
        document.querySelector("svg").setAttribute("class","hidden")
    }
    console.log(programada.configraph())
    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(programada.configraph())
}

export function ingresarPodcast(){
    Swal.fire({
        title: 'Carga masiva de podcasts',
        html: `<input type="file" id="filePodcasts" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const filePodcasts = Swal.getPopup().querySelector('#filePodcasts').files[0]
            return filePodcasts
        }
    }).then((result) =>{
        const reader = new FileReader()

        reader.addEventListener("load", ()=>{
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                podcasts.insertar(new Podcast(user.name, user.topic, user.guests, user.duration))
                Swal.fire("Registrados...",'Carga masiva realizada', 'success')
            });
        })

        reader.readAsText(result.value)
    })
}

export function graficarPodcast(){
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += podcasts.graficar()
    dot += "}\n"

    if(document.getElementById("imgAdmin")){
        document.getElementById("imgAdmin").remove()
    }
    if(document.querySelector("svg")){
        document.querySelector("svg").setAttribute("class","hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}

// Usuarios

export function logOutUSer(){
    hideUser()
    hideUserFriendsContent()
    hideBloqueadosContent()
    showLogin()
}

export function mostrarUsuarios(){
    hideBloqueadosContent()
    showUserFriendsContent()

    let usersList = document.getElementById("usersListFriends")
    let friendsList = document.getElementById("friendsListFriends")
    usersList.innerHTML = ""
    friendsList.innerHTML = ""
    for (let index = 0; index < usuarios.size(); index++) {

        let user = usuarios.obtenern(index)
        let icon = document.createElement("ion-icon")
        icon.setAttribute("name","person-circle-outline")
        let userIcon = document.createElement("span")
        userIcon.classList.add("text-9xl")
        userIcon.classList.add("mx-5")
        userIcon.appendChild(icon)
        let userName = document.createElement("p")
        userName.setAttribute("class", "text-xl font-bold text-gray-800 mx-5")
        userName.innerHTML = user.username
        let botonAgregar = document.createElement("button")
        botonAgregar.setAttribute("id", "agregarAmigoUser")
        botonAgregar.setAttribute("name", user.username)
        botonAgregar.setAttribute("class", "mt-5 py-2 px-5 bg-green-700 border-green-800 rounded-xl hover:scale-110 duration-300 text-slate-100")
        botonAgregar.innerHTML = "Agregar"
        let botonBloquear = document.createElement("button")
        botonBloquear.setAttribute("id", "bloquearUsuarioUser")
        botonBloquear.setAttribute("name", user.username)
        botonBloquear.setAttribute("class", "my-5 py-2 px-5 bg-red-700 border-red-800 rounded-xl hover:scale-110 duration-300 text-slate-100")
        botonBloquear.innerHTML = "Bloquear"

        let userBox = document.createElement("div")
        userBox.setAttribute("class", "flex flex-col")
        userBox.appendChild(userIcon)
        userBox.appendChild(userName)

        if(usuarioActual.dato.friends.buscarUser(user.username) != null){
            friendsList.appendChild(userBox)
        }else{
            if(usuarioActual.dato.bloqueados.buscarUser(user.username) == null && usuarioActual.dato.username != user.username){
                userBox.appendChild(botonAgregar)
                userBox.appendChild(botonBloquear)
                usersList.appendChild(userBox)
            }
        }
    }
    mostrarAmigosGrafica()
    agregarAmigo()
}

export function agregarAmigo(){
    let div1 = document.getElementById("usersListFriends")
    let botonAgregar = div1.querySelectorAll("#agregarAmigoUser")
    let botonBloquear = div1.querySelectorAll("#bloquearUsuarioUser")

    botonAgregar.forEach( boton =>{
        boton.addEventListener("click", ()=>{
            let user = usuarios.buscarUser2(boton.getAttribute("name"))
            usuarioActual.dato.friends.push(user.dato)
            mostrarUsuarios()
        })
    })

    botonBloquear.forEach( boton =>{
        boton.addEventListener("click", ()=>{
            let user = usuarios.buscarUser2(boton.getAttribute("name"))
            usuarioActual.dato.bloqueados.enqueue(user.dato)
            mostrarUsuarios()
        })
    })
}

export function mostrarAmigosGrafica(){
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += usuarioActual.dato.friends.graficar()
    dot += "}\n"

    if(document.querySelector("svg")){
        document.querySelector("svg").setAttribute("class","hidden")
    }

    d3.select("#graficaAmigos").graphviz().width(500).height(500).renderDot(dot)
}

export function mostrarBloqueados(){
    hideUserFriendsContent()
    showBloqueadosContent()

    const bloqueadosListBloqueados = document.getElementById("bloqueadosListBloqueados")
    bloqueadosListBloqueados.innerHTML = ""

    for (let index = 0; index < usuarioActual.dato.bloqueados.size(); index++) {

        let user = usuarioActual.dato.bloqueados.obtenern(index)

        let icon = document.createElement("ion-icon")
        icon.setAttribute("name","person-circle-outline")

        let userIcon = document.createElement("span")
        userIcon.classList.add("text-9xl")
        userIcon.classList.add("mx-5")
        userIcon.appendChild(icon)

        let userName = document.createElement("p")
        userName.setAttribute("class", "text-xl font-bold text-gray-800 mx-5")
        userName.innerHTML = user.username

        let botonDesbloquear = document.createElement("button")
        botonDesbloquear.setAttribute("id", "desbloquearBloqueadosUser")
        botonDesbloquear.setAttribute("name", user.username)
        botonDesbloquear.setAttribute("class", "mt-5 py-2 px-5 bg-green-700 border-green-800 rounded-xl hover:scale-110 duration-300 text-slate-100")
        botonDesbloquear.innerHTML = "Desbloquear"

        let userBox = document.createElement("div")
        userBox.setAttribute("class", "flex flex-col")
        userBox.appendChild(userIcon)
        userBox.appendChild(userName)
        userBox.appendChild(botonDesbloquear)

        bloqueadosListBloqueados.appendChild(userBox)
    }
    mostrarBloqueadosGrafica()
}

export function mostrarBloqueadosGrafica(){
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += usuarioActual.dato.bloqueados.graficar()
    dot += "rankdir=LR;\n}\n"

    if(document.querySelector("svg")){
        document.querySelector("svg").setAttribute("class","hidden")
    }

    d3.select("#graficaBloqueados").graphviz().width(800).height(500).renderDot(dot)
}