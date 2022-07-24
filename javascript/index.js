const emailNewsletter = document.querySelector("#emailNewsletter")
const tituloNews=document.querySelector("#tituloNews")
cargarProductos("index")
document.querySelector('#formNewsletter').addEventListener('submit', function (event) {
    event.preventDefault();
    tituloNews.innerText="¡ENVIANDO...!"
    const serviceID = 'lealuveemail';
    const templateID = 'template_wb6hf2j';
    let templateParams = {
        email: `${emailNewsletter.value}`
    }
    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            tituloNews.innerText="¡Gracias por suscribirte a nuestra Newsletter!"
            mensajeToastify("¡Felicidades, te has suscrito!")
        });
});
