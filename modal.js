const contenedorModal=document.querySelector("#contenedorModal")
const btnAbrir=document.querySelector("#boton-carrito")
const btnCerrar=document.querySelector("#carritoCerrar")
const estructuraCarrito=document.querySelector("#estructuraCarrito")

btnAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle("modal-active")
})
btnCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle("modal-active")
})
contenedorModal.addEventListener('click', ()=>{
   btnCerrar.click()
 })
estructuraCarrito.addEventListener('click', (event)=>{
    event.stopPropagation()
})