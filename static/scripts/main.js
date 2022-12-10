import { hideAdmin, hideLogin, hideSignin, login, showAdmin, showLogin, showSignin, signin, usuarios, usuarioActual, ingresarUsuarios, graficarUsuarios, ingresarArtistas, graficarArtistasCanciones, ingresarCanciones } from "./funciones.js"

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

logOutAdmin.addEventListener("click", ()=>{
    hideAdmin()
    showLogin()
})

usuariosAdmin.addEventListener("click", ()=>{ingresarUsuarios()})
artistasAdmin.addEventListener("click", ()=>{ingresarArtistas()})
cancionesAdmin.addEventListener("click", ()=>{ingresarCanciones()})

usuariosAdminGraph.addEventListener("click", ()=>{graficarUsuarios()})
artistasCancionesAdminGraph.addEventListener("click", ()=>{graficarArtistasCanciones()})