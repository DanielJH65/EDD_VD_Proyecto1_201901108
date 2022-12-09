import { hideAdmin, hideLogin, hideSignin, login, showAdmin, showLogin, showSignin, signin, usuarios, usuarioActual, ingresarUsuarios, graficarUsuarios } from "./funciones.js"

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
const usuariosAdminGraph = document.getElementById("usersAdminGraph")

logOutAdmin.addEventListener("click", ()=>{
    hideAdmin()
    showLogin()
})

usuariosAdmin.addEventListener("click", ()=>{ingresarUsuarios()})
usuariosAdminGraph.addEventListener("click", ()=>{graficarUsuarios()})