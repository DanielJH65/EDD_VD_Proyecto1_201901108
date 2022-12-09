import "./js-sha256.js"
import { Usuario } from "./objetos.js"
import { ListaSimple } from "./listaSimple.js"

// Secciones para mostrar y ocultar

const loginSection = document.getElementById("login")
const signinSection = document.getElementById("signin")
const adminSection = document.getElementById("admin")

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

// Login

export let usuarios = new ListaSimple()
export let usuarioActual

usuarios.insertarFinal(new Usuario(2654568452521, "Oscar Armin", "EDD", sha256("123"), "+502 (123) 123-4567", true))

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

        }
    } else {
        Swal.fire('Oops...', 'Usuario o contraseña incorrectos', 'error')
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

    usuarios.insertarFinal(new Usuario(dpi.value, name.value, username.value, sha256(password.value), tel.value, false))

    Swal.fire('Perfecto...', 'Usuario registrado', 'success')

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
        html: `<input type="file" id="fileUser" class="swal2-input w-full">`,
        confirmButtonText: 'Cargar',
        focusConfirm: false,
        preConfirm: () => {
            const file = Swal.getPopup().querySelector('#fileUser').files[0]
            return file
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

    document.getElementById("imgAdmin").remove()

    d3.select("#graficaAdmin").graphviz().width(500).height(500).renderDot(dot)
}