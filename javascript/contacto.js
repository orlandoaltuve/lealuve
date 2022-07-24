const formContacto = document.querySelector("#formContacto")
const email = document.querySelector("#email")
const nombre = document.querySelector("#name")
const telefono = document.querySelector("#phone")
const mensaje = document.querySelector("#message")
const texContacto=document.querySelector("#texContacto")
const eliminarContacto=document.querySelector("#eliminarContacto")
formContacto.addEventListener('submit', (event) => {
    event.preventDefault()
    texContacto.innerText="Enviando..."
    const serviceID = 'lealuveemail';
    const templateID = 'template_g84uzwg';
    let templateParams = {
        email: `${email.value}`,
        name: `${nombre.value}`,
        phone: `${telefono.value}`,
        message: `${mensaje.value}`
    }

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            texContacto.innerText="¡Gracias por contactarnos!"
            mensajeToastify("¡Mensaje Enviado!")
        });
})

eliminarContacto.addEventListener('click',()=>{
    texContacto.innerText=''
})
