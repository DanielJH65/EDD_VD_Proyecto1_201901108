import "./js-sha256.js"
import { Usuario, Artista, Cancion, Podcast, Programada } from "./objetos.js"
import { ListaSimple } from "./listaSimple.js"
import { ListaListas } from "./listaListas.js"
import { ArbolBB } from "./arbolBB.js"
import { MatrizDispersa } from "./matrizDispersa.js"
import { meses } from "./meses.js"

// Secciones para mostrar y ocultar

const loginSection = document.getElementById("login")
const signinSection = document.getElementById("signin")
const adminSection = document.getElementById("admin")
const userSection = document.getElementById("user")
const userFriendsConten = document.getElementById("friendsContent")
const bloqueadosFriendsContent = document.getElementById("bloqueadosContent")
const userMusicContent = document.getElementById("musicContent")
const userPlaylistContent = document.getElementById("playlistContent")
const userArtistasContent = document.getElementById("artistasContent")
const userPodcastContent = document.getElementById("podcastContent")

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

export function showUserMusicContent() {
    userMusicContent.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center px-12")
}

export function hideUserMusicContent() {
    userMusicContent.setAttribute("class", "bg-gray-400 hidden flex-col items-center justify-center px-12")
}

export function showUserPlaylistContent() {
    userPlaylistContent.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideUserPLaylistContent() {
    userPlaylistContent.setAttribute("class", "bg-gray-400 hidden flex-col items-center justify-center")
}

export function showUserArtistasContent() {
    userArtistasContent.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideUserArtistasContent() {
    userArtistasContent.setAttribute("class", "bg-gray-400 hidden flex-col items-center justify-center")
}

export function showUserFriendsContent() {
    userFriendsConten.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideUserFriendsContent() {
    userFriendsConten.setAttribute("class", "bg-gray-400 hidden items-center justify-center")
}

export function showBloqueadosContent() {
    bloqueadosFriendsContent.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideBloqueadosContent() {
    bloqueadosFriendsContent.setAttribute("class", "bg-gray-400 hidden flex-col items-center justify-center")
}

export function showUserPodcastContent() {
    userPodcastContent.setAttribute("class", "bg-gray-400 flex flex-col items-center justify-center")
}

export function hideUSerPodcastContent() {
    userPodcastContent.setAttribute("class", "bg-gray-400 hidden flex-col items-center justify-center")
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

    if (usuarios.insertarFinal(new Usuario(dpi.value, name.value, username.value, sha256(password.value), tel.value, false))) {
        Swal.fire('Perfecto...', 'Usuario registrado', 'success')
    } else {
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

export function ingresarUsuarios() {

    Swal.fire({
        title: 'Carga masiva de usuarios',
        html: `<input type="file" id="fileUser" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileuser = Swal.getPopup().querySelector('#fileUser').files[0]
            return fileuser
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                usuarios.insertarFinal(new Usuario(user.dpi, user.name, user.username, sha256(user.password), user.phone, user.admin))
                Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
            });
        })

        reader.readAsText(result.value)
    })
}

export function graficarUsuarios() {
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += usuarios.graficarUser()
    dot += usuarios.graficarConexionesUser()
    dot += "rankdir= LR;\n}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}

export function ingresarArtistas() {

    Swal.fire({
        title: 'Carga masiva de artistas',
        html: `<input type="file" id="fileArtistas" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileartist = Swal.getPopup().querySelector('#fileArtistas').files[0]
            return fileartist
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                artistasCanciones.insertarCabecera(new Artista(user.name, user.age, user.country))
            });
            Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
        })

        reader.readAsText(result.value)
    })
}

export function ingresarCanciones() {

    Swal.fire({
        title: 'Carga masiva de canciones',
        html: `<input type="file" id="fileCanciones" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const filesongs = Swal.getPopup().querySelector('#fileCanciones').files[0]
            return filesongs
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                artistasCanciones.insertarValor(user.artist, new Cancion(user.artist, user.name, user.duration, user.gender))
                Swal.fire("Registradas...", 'Carga masiva realizada', 'success')
            });
        })

        reader.readAsText(result.value)
    })
}

export function graficarArtistasCanciones() {
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += artistasCanciones.graficar()
    dot += "}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}

export function ingresarProgramadas() {
    Swal.fire({
        title: 'Carga masiva de música programada',
        html: `<input type="file" id="fileProgramada" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const fileProgramada = Swal.getPopup().querySelector('#fileProgramada').files[0]
            return fileProgramada
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                programada.insertar(user.month, user.day, new Programada(user.month, user.day, user.song, user.artist))
                Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
            });
        })
        reader.readAsText(result.value)
    })
}

export function graficarProgramadas() {
    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(programada.configraph())
}

export function ingresarPodcast() {
    Swal.fire({
        title: 'Carga masiva de podcasts',
        html: `<input type="file" id="filePodcasts" class="swal2-input">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const filePodcasts = Swal.getPopup().querySelector('#filePodcasts').files[0]
            return filePodcasts
        }
    }).then((result) => {
        const reader = new FileReader()

        reader.addEventListener("load", () => {
            let datos = JSON.parse(reader.result)
            datos.forEach(user => {
                podcasts.insertar(new Podcast(user.name, user.topic, user.guests, user.duration))
                Swal.fire("Registrados...", 'Carga masiva realizada', 'success')
            });
        })

        reader.readAsText(result.value)
    })
}

export function graficarPodcast() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += podcasts.graficar()
    dot += "}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}

// Usuarios

export function logOutUSer() {
    hideUser()
    hideUserMusicContent()
    hideUserPLaylistContent()
    hideUserArtistasContent()
    hideUserFriendsContent()
    hideBloqueadosContent()
    hideUSerPodcastContent()
    showLogin()
}

export function mostrarMusica() {
    hideUserPLaylistContent()
    hideUserArtistasContent()
    hideUserFriendsContent()
    hideBloqueadosContent()
    hideUSerPodcastContent()
    showUserMusicContent()

    let cancionActualindex = 0
    if (artistasCanciones.size() > 0) {
        let cancionActual = artistasCanciones.obtenern(cancionActualindex)
        const labelCancion = document.getElementById("nombreCancionMusic")
        const labelArtista = document.getElementById("artistaCancionMusic")

        labelCancion.innerHTML = cancionActual.nombre
        labelArtista.innerHTML = cancionActual.artista

        const agregarPlaylistMusic = document.getElementById("agregarPlaylistMusic")
        agregarPlaylistMusic.setAttribute("name", cancionActualindex)

        const botonSiguienteMusic = document.getElementById("nextCancionMusic")
        const botonAnteriorMusic = document.getElementById("anteriorCancionMusic")

        botonSiguienteMusic.addEventListener("click", () => {
            cancionActualindex++
            if (artistasCanciones.size() > cancionActualindex) {
                cancionActual = artistasCanciones.obtenern(cancionActualindex)
                labelCancion.innerHTML = cancionActual.nombre
                labelArtista.innerHTML = cancionActual.artista
                agregarPlaylistMusic.setAttribute("name", cancionActualindex)
            }
        })
        botonAnteriorMusic.addEventListener("click", () => {
            cancionActualindex--
            if (cancionActualindex >= 0) {
                cancionActual = artistasCanciones.obtenern(cancionActualindex)
                labelCancion.innerHTML = cancionActual.nombre
                labelArtista.innerHTML = cancionActual.artista
                agregarPlaylistMusic.setAttribute("name", cancionActualindex)
            }
        })
    }
}

export function capturarFecha() {
    const fechaProgramadaMusicCalendar = document.getElementById("fechaProgramadaMusicCalendar")
    const fecha = fechaProgramadaMusicCalendar.value.split("-")

    const cancion = programada.obtener(meses[parseInt(fecha[1]) - 1], parseInt(fecha[2]).toString())
    if (cancion != null) {
        const nombreCancionMusicCalendar = document.getElementById("nombreCancionMusicCalendar")
        const artistaCancionMusicCalendar = document.getElementById("artistaCancionMusicCalendar")
        const nombreCancionMusicCalendar2 = document.getElementById("nombreCancionMusicCalendar2")
        const artistaCancionMusicCalendar2 = document.getElementById("artistaCancionMusicCalendar2")
        const lanzamientoCancionMusicCalendar2 = document.getElementById("lanzamientoCancionMusicCalendar2")

        nombreCancionMusicCalendar.innerHTML = cancion.song
        nombreCancionMusicCalendar2.innerHTML = cancion.song
        artistaCancionMusicCalendar.innerHTML = cancion.artist
        artistaCancionMusicCalendar2.innerHTML = cancion.artist
        lanzamientoCancionMusicCalendar2.innerHTML = cancion.month + " - " + cancion.day

    } else {
        Swal.fire('Oops...', 'No hay cancion programada para esa fecha', 'warning')
    }
}

export function publicarCancion() {
    Swal.fire({
        title: 'Publicar nueva Canción',
        html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="text" id="duracion" class="swal2-input" placeholder="Duracion">
        <input type="text" id="genero" class="swal2-input" placeholder="Generos (Separados por coma)">
        <input type="date" id="fecha" class="swal2-input" value="2000-01-01" min="2022-01-01" max="2022-12-31">`,
        confirmButtonText: 'Publicar o Programar',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const genero = Swal.getPopup().querySelector('#genero').value.split(",")
            const duracion = Swal.getPopup().querySelector('#duracion').value
            const fecha = Swal.getPopup().querySelector('#fecha').value.split("-")
            if (!nombre) {
                Swal.showValidationMessage(`Ingrese un nombre para la canción`)
            }
            return { 'nombre': nombre, 'genero': genero, 'duracion': duracion, 'fecha': fecha }
        }
    }).then((result) => {
        if (parseInt(result.value.fecha[0]) != 2000) {
            let dia = parseInt(result.value.fecha[2]).toString()
            let mes = meses[parseInt(result.value.fecha[1]) - 1]
            programada.insertar(mes, dia, new Programada(mes, dia, result.value.nombre, usuarioActual.dato.username))
            Swal.fire("Programada...", 'Canción registrada con exito', 'success')
        } else {
            let artista = artistasCanciones.obtenerArtista(usuarioActual.dato.username)
            if (artista == null) {
                Swal.fire({
                    title: 'Ingrese los datos de artista y vuelva a publicar la canción',
                    html: `<input type="text" id="country" class="swal2-input" placeholder="Country">
                    <input type="text" id="age" class="swal2-input" placeholder="Age">`,
                    confirmButtonText: 'Crear datos de Artista',
                    focusConfirm: false,
                    preConfirm: () => {
                        const country = Swal.getPopup().querySelector('#country').value
                        const age = Swal.getPopup().querySelector('#age').value
                        if (!country || !age) {
                            Swal.showValidationMessage(`Ingrese un país y su edad`)
                        }
                        return { 'country': country, 'age': age }
                    }
                }).then((result) => {
                    artistasCanciones.insertarCabecera(new Artista(usuarioActual.dato.username, result.value.age, result.value.country))
                    Swal.fire("Creado...", 'Artista creado con exito', 'success')
                })
            } else {
                artista.lista.insertarFinal(new Cancion(usuarioActual.dato.username, result.value.nombre, result.value.duracion, result.value.genero))
                Swal.fire("Publicada...", 'Canción publicada con exito', 'success')
            }
        }
    })
}

export function agregarCancionAPlayslist() {
    let agregarPlaylistMusic = document.getElementById("agregarPlaylistMusic")
    if (parseInt(agregarPlaylistMusic.getAttribute("name")) >= 0) {
        usuarioActual.dato.playList.insertarFinal(artistasCanciones.obtenern(parseInt(agregarPlaylistMusic.getAttribute("name"))))
        Swal.fire("Agregada...", "Cancion agregada a la playlist", 'success')
    }
}

export function mostrarPlaylist() {
    hideUserMusicContent()
    hideUserArtistasContent()
    hideUserFriendsContent()
    hideBloqueadosContent()
    hideUSerPodcastContent()
    showUserPlaylistContent()

    if (usuarioActual.dato.playList.first != null) {
        let cancionActual = usuarioActual.dato.playList.first
        const labelCancion = document.getElementById("nombreCancionPlaylist")
        const labelArtista = document.getElementById("artistaCancionPlaylist")

        labelCancion.innerHTML = cancionActual.dato.nombre
        labelArtista.innerHTML = cancionActual.dato.artista

        const botonSiguienteMusic = document.getElementById("nextCancionPlaylist")
        const botonAnteriorMusic = document.getElementById("anteriorCancionPlaylist")

        botonSiguienteMusic.addEventListener("click", () => {
            cancionActual = cancionActual.next
            labelCancion.innerHTML = cancionActual.dato.nombre
            labelArtista.innerHTML = cancionActual.dato.artista
        })
        botonAnteriorMusic.addEventListener("click", () => {
            cancionActual = cancionActual.prev
            labelCancion.innerHTML = cancionActual.dato.nombre
            labelArtista.innerHTML = cancionActual.dato.artista
        })
    }
    mostrarPlaylistGrafica()
}

export function mostrarPlaylistGrafica() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += usuarioActual.dato.playList.graficar()
    dot += "rankdir=LR;\n}\n"

    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graficaPlaylistUser").graphviz().width(800).height(500).renderDot(dot)
}

export function mostrarArtistas() {
    hideUserMusicContent()
    hideUserPLaylistContent()
    hideUserFriendsContent()
    hideBloqueadosContent()
    hideUSerPodcastContent()
    showUserArtistasContent()

    mostrarArtistasCanciones()
    mostrarArtistasOrdenar()
    mostrarGraficaAmigosCanciones()
}

export function mostrarArtistasCanciones(){
    
}

export function mostrarArtistasOrdenar(){
    
}

export function mostrarGraficaAmigosCanciones(){
    let dot = "digraph G {\n"
    dot += "node[shape=component, style=\"filled\", color=\"gray\"];\n"
    dot += artistasCanciones.graficar()
    dot += "}\n"

    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }
    d3.select("#graficaArtistasUser").graphviz().width(800).height(500).renderDot(dot)
}

export function mostrarUsuarios() {
    hideUserMusicContent()
    hideUserPLaylistContent()
    hideUserArtistasContent()
    hideBloqueadosContent()
    hideUSerPodcastContent()
    showUserFriendsContent()

    let usersList = document.getElementById("usersListFriends")
    let friendsList = document.getElementById("friendsListFriends")
    usersList.innerHTML = ""
    friendsList.innerHTML = ""
    for (let index = 0; index < usuarios.size(); index++) {

        let user = usuarios.obtenern(index)
        let icon = document.createElement("ion-icon")
        icon.setAttribute("name", "person-circle-outline")
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

        if (usuarioActual.dato.friends.buscarUser(user.username) != null) {
            if (usuarioActual.dato.bloqueados.buscarUser(user.username) == null) {
                userBox.appendChild(botonBloquear)
            }
            friendsList.appendChild(userBox)
        } else {
            if (usuarioActual.dato.bloqueados.buscarUser(user.username) == null && usuarioActual.dato.username != user.username) {
                userBox.appendChild(botonAgregar)
                userBox.appendChild(botonBloquear)
                usersList.appendChild(userBox)
            }
        }
    }
    mostrarAmigosGrafica()
    agregarAmigo()
}

export function agregarAmigo() {
    let div1 = document.getElementById("friendsContent")
    let botonAgregar = div1.querySelectorAll("#agregarAmigoUser")
    let botonBloquear = div1.querySelectorAll("#bloquearUsuarioUser")

    botonAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            let user = usuarios.buscarUser2(boton.getAttribute("name"))
            usuarioActual.dato.friends.push(user.dato)
            mostrarUsuarios()
        })
    })

    botonBloquear.forEach(boton => {
        boton.addEventListener("click", () => {
            let user = usuarios.buscarUser2(boton.getAttribute("name"))
            usuarioActual.dato.bloqueados.enqueue(user.dato)
            mostrarUsuarios()
        })
    })
}

export function eliminarAmigo() {
    usuarioActual.dato.friends.pop()
    mostrarUsuarios()
}

export function mostrarAmigosGrafica() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += usuarioActual.dato.friends.graficar()
    dot += "}\n"

    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaAmigos").graphviz().width(500).height(500).renderDot(dot)
}

export function mostrarBloqueados() {
    hideUserMusicContent()
    hideUserPLaylistContent()
    hideUserArtistasContent()
    hideUserFriendsContent()
    hideUSerPodcastContent()
    showBloqueadosContent()

    const bloqueadosListBloqueados = document.getElementById("bloqueadosListBloqueados")
    bloqueadosListBloqueados.innerHTML = ""

    for (let index = 0; index < usuarioActual.dato.bloqueados.size(); index++) {

        let user = usuarioActual.dato.bloqueados.obtenern(index)

        let icon = document.createElement("ion-icon")
        icon.setAttribute("name", "person-circle-outline")

        let userIcon = document.createElement("span")
        userIcon.classList.add("text-9xl")
        userIcon.classList.add("mx-5")
        userIcon.appendChild(icon)

        let userName = document.createElement("p")
        userName.setAttribute("class", "text-xl font-bold text-gray-800 mx-5")
        userName.innerHTML = user.username

        let userBox = document.createElement("div")
        userBox.setAttribute("class", "flex flex-col")
        userBox.appendChild(userIcon)
        userBox.appendChild(userName)

        bloqueadosListBloqueados.appendChild(userBox)
    }
    mostrarBloqueadosGrafica()
}

export function desbloquearUser() {
    usuarioActual.dato.bloqueados.dequeue()
    mostrarBloqueados()
}

export function mostrarBloqueadosGrafica() {
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += usuarioActual.dato.bloqueados.graficar()
    dot += "rankdir=LR;\n}\n"

    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaBloqueados").graphviz().width(800).height(500).renderDot(dot)
}

export function mostrarPodcast() {
    hideUserMusicContent()
    hideUserPLaylistContent()
    hideUserArtistasContent()
    hideUserFriendsContent()
    hideBloqueadosContent()
    showUserPodcastContent()

    const podcastsListUser = document.getElementById("podcastListUser")
    podcastsListUser.innerHTML = ""
    recorrerPodcasts(podcasts.root, podcastsListUser)

    graficarPodcastUser()
}

export function recorrerPodcasts(root, lista){
    if(root != null){
        recorrerPodcasts(root.left, lista)
        
        let divContenedorPodcast = document.createElement("div")
        divContenedorPodcast.setAttribute("class", "bg-stone-800 flex flex-col items-center justify-center text-gray-100 mx-5 px-3 my-5 py-5 rounded-3xl")

        let spanReproductor = document.createElement("span")
        spanReproductor.setAttribute("class", "text-3xl py-3")
        spanReproductor.innerHTML = "Reproductor de Música"

        let imagenDisco = document.createElement("img")
        imagenDisco.src = "https://img.freepik.com/vector-gratis/poster-portada-album-altavoces-musica_1017-26877.jpg"
        imagenDisco.setAttribute("class", "rounded-2xl w-44 h-44")

        let spanNombre = document.createElement("span")
        spanNombre.setAttribute("class", "text-xl py-3")
        spanNombre.innerHTML = root.dato.name

        let spanTopic = document.createElement("span")
        spanTopic.setAttribute("class", "text-xl py-3")
        spanTopic.innerHTML = root.dato.topic

        let barra = document.createElement("input")
        barra.type = "range"

        divContenedorPodcast.appendChild(spanReproductor)
        divContenedorPodcast.appendChild(imagenDisco)
        divContenedorPodcast.appendChild(spanNombre)
        divContenedorPodcast.appendChild(spanTopic)
        divContenedorPodcast.appendChild(barra)
        lista.appendChild(divContenedorPodcast)

        recorrerPodcasts(root.right, lista)
    }
}

export function agregarPodcast(){
    Swal.fire({
        title: 'Publicar nuevo Podcast',
        html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="text" id="topic" class="swal2-input" placeholder="Topic">
        <input type="text" id="guests" class="swal2-input" placeholder="Guests (Separados por coma)">
        <input type="text" id="duracion" class="swal2-input" placeholder="Duración">`,
        confirmButtonText: 'Publicar',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value
            const topic = Swal.getPopup().querySelector('#topic').value
            const duracion = Swal.getPopup().querySelector('#duracion').value
            const guests = Swal.getPopup().querySelector('#guests').value.split(",")
            if (!nombre || !topic || !duracion) {
                Swal.showValidationMessage(`Ingrese todos los campos`)
            }
            return { 'nombre': nombre, 'topic': topic, 'duracion': duracion, 'guests': guests }
        }
    }).then((result) => {
        podcasts.insertar(new Podcast(result.value.nombre, result.value.topic, result.value.guests, result.value.duracion))
        Swal.fire("Agregado...", "Podcast publicado", 'success')
    })
}

export function graficarPodcastUser(){
    let dot = "digraph G {\n"
    dot += "node[shape=record, style=\"filled\"];\n"
    dot += podcasts.graficar()
    dot += "}\n"

    if (document.getElementById("imgAdmin")) {
        document.getElementById("imgAdmin").remove()
    }
    if (document.querySelector("svg")) {
        document.querySelector("svg").setAttribute("class", "hidden")
    }

    d3.select("#graficaPodcastsUser").graphviz().width(500).height(500).renderDot(dot)
}