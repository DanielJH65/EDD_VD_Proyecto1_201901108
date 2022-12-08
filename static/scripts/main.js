import { ListaSimple } from "./listaSimple.js"
import { Usuario } from "./objetos.js"
import "./js-sha256.js"
import { Pila } from "./pila.js"
import { Cola } from "./cola.js"
import { ListaCircular } from "./listaCircular.js"

let usuarios = new ListaSimple()
let usuarioActual

usuarios.insertarFinal(new Usuario(2654568452521, "Oscar Armin", "EDD", sha256("123"), "+502 (123) 123-4567", true))

// Secciones para mostrar y ocultar

const loginSection = document.getElementById("login")
const signinSection = document.getElementById("signin")
const adminSection = document.getElementById("admin")

function hideLogin(){
    loginSection.setAttribute("class", "bg-gray-800 min-h-screen hidden items-center justify-center")
}

function showLogin(){
    loginSection.setAttribute("class", "bg-gray-800 min-h-screen flex items-center justify-center")
}

function showSignin(){
    signinSection.setAttribute("class", "bg-gray-800 min-h-screen flex items-center justify-center")
}

function hideSignin(){
    signinSection.setAttribute("class", "bg-gray-800 min-h-screen hidden items-center justify-center")
}

function showAdmin(){
    adminSection.setAttribute("class", "block")
}

function hideAdmin(){
    adminSection.setAttribute("class", "hidden")
}

//Log in

const formLogin = document.getElementById('formLogin')
const signinLogin = document.getElementById('registroLogin')

function login(e){
    const username = document.getElementById("usernamelogin")
    const password = document.getElementById("passwordlogin")
    const admin = document.getElementById("adminlogin")

    usuarioActual = usuarios.buscar(username.value, sha256(password.value), admin.checked)

    if(usuarioActual != null){
        hideLogin()
        if(usuarioActual.dato.admin){
            showAdmin()
        }else{

        }
    }else{
        Swal.fire('Oops...','Usuario o contraseña incorrectos','error')
    }

    e.preventDefault()

    username.value = ""
    password.value = ""
    admin.checked = false
}

formLogin.addEventListener("submit", login)
signinLogin.addEventListener("click", ()=>{
    hideLogin()
    showSignin()
})

//Sign in

const formSignin = document.getElementById("formSignin")
const loginSignin = document.getElementById("loginSignin")

function signin(e){
    const username = document.getElementById("usernamesignin")
    const password = document.getElementById("passwordsignin")
    const name = document.getElementById("namesignin")
    const dpi = document.getElementById("dpisignin")
    const tel = document.getElementById("telsignin")

    usuarios.insertarFinal(new Usuario(dpi.value, name.value, username.value, sha256(password.value), tel.value, false))

    Swal.fire('Perfecto...','Usuario registrado', 'success')

    e.preventDefault();

    username.value = ""
    password.value = ""
    name.value = ""
    dpi.value = ""
    tel.value = ""
}

formSignin.addEventListener("submit", signin)
loginSignin.addEventListener("click", ()=>{
    hideSignin()
    showLogin()
})

// Admin

const logOutAdmin = document.getElementById("logOutAdmin")

logOutAdmin.addEventListener("click", ()=>{
    hideAdmin()
    showLogin()
    usuarioActual = null
})