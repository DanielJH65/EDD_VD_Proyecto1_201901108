import { hideAdmin, hideLogin, hideSignin, login, showAdmin, showLogin, showSignin, signin, usuarios, usuarioActual, ingresarUsuarios, graficarUsuarios, ingresarArtistas, graficarArtistasCanciones, ingresarCanciones, hideUser, mostrarUsuarios, graficarPodcast, ingresarPodcast, ingresarProgramadas, graficarProgramadas, hideUserFriendsContent, logOutUSer, mostrarBloqueados } from "./funciones.js"

//Log in

const formLogin = document.getElementById('formLogin')
const signinLogin = document.getElementById('registroLogin')

formLogin.addEventListener("submit", (e)=>{login(e)})
signinLogin.addEventListener("click", ()=>{
    hideLogin()
    showSignin()
})

//Sign in

const formSignin = document.getElementById("formSignin")
const loginSignin = document.getElementById("loginSignin")

formSignin.addEventListener("submit", (e)=>{signin(e)})
loginSignin.addEventListener("click", ()=>{
    hideSignin()
    showLogin()
})

// Admin

const logOutAdmin = document.getElementById("logOutAdmin")
const usuariosAdmin = document.getElementById("usuariosAdmin")
const artistasAdmin = document.getElementById("artistasAdmin")
const cancionesAdmin = document.getElementById("cancionesAdmin")
const programadaAdmin = document.getElementById("programadaAdmin")
const podcastAdmin = document.getElementById("podcastAdmin")

const usuariosAdminGraph = document.getElementById("usersAdminGraph")
const artistasCancionesAdminGraph = document.getElementById("cancionesAdminGraph")
const podcastsAdminGraph = document.getElementById("podcastAdminGraph")
const programadasAdminGraph = document.getElementById("programadasAdminGraph")

logOutAdmin.addEventListener("click", ()=>{
    hideAdmin()
    showLogin()
})

usuariosAdmin.addEventListener("click", ()=>{ingresarUsuarios()})
artistasAdmin.addEventListener("click", ()=>{ingresarArtistas()})
cancionesAdmin.addEventListener("click", ()=>{ingresarCanciones()})
programadaAdmin.addEventListener("click", ()=>{ingresarProgramadas()})
podcastAdmin.addEventListener("click", ()=>{ingresarPodcast()})

usuariosAdminGraph.addEventListener("click", ()=>{graficarUsuarios()})
artistasCancionesAdminGraph.addEventListener("click", ()=>{graficarArtistasCanciones()})
podcastsAdminGraph.addEventListener("click", ()=>{graficarPodcast()})
programadasAdminGraph.addEventListener("click", ()=>{graficarProgramadas()})

// Usuarios

const logOutUser = document.getElementById("logOutUser")
const amigosUser = document.getElementById("amigosUser")
const bloqueadosUser = document.getElementById("bloqueadosUser")

logOutUser.addEventListener("click", ()=>{logOutUSer()})

amigosUser.addEventListener("click", ()=>{mostrarUsuarios()})
bloqueadosUser.addEventListener("click", ()=>{mostrarBloqueados()})