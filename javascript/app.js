const contenedorProductos=document.querySelector("#contenedor-productos")
const carritoContenedor=document.querySelector("#carrito-contenedor")
const totalCarrito=document.querySelector("#precioTotal")
const cantidadEnCarrito=document.querySelector("#contadorCarrito")
const btnVaciarCarro=document.querySelector("#vaciar-carrito")
let carrito= JSON.parse(localStorage.getItem("carrito"))||[]
let stock=[]

// generar el DOM de toddos los productos
function cargarProductos(pagina){
    let ruta=pagina==="productos" ? ".":""
    fetch("../javascript/BBDD.json")
        .then((resp)=>resp.json())
        .then((data)=> {
            stock=data

            stock.forEach((el)=>{ //dom deproductos para la pagina 
                const div=document.createElement("div")
                div.classList.add("cardP")
                div.innerHTML= `
                            <img src=${ruta+el.img} alt=${el.nombre}>
                            <p class="nombreProducto">${el.nombre}</p>
                            <P class="precioProducto">$${el.precio}</P>
                            <button onclick="agregarAlCarrito(${el.id})" class="boton-principal"> Agregar </button>
                                `
                contenedorProductos.append(div)
            })

        })


}

function agregarAlCarrito(idProducto){
    const item= carrito.find((producto)=>producto.id===idProducto)
    if(item){
        item.cantidad++
        mensajeToastify(item.nombre,"agregó")
    }else{
        const BaseDeDatos=[...stock]// se que puedo trabajar directamente con stock y no es necesario hacer el Spread, pero lo hice para cumplir con el desafío de implementarlo
        const {id,nombre,precio,img}=BaseDeDatos.find((producto)=>producto.id===idProducto)
        const item={id, nombre, precio, img, cantidad:1 }
        carrito.push(item)
        mensajeToastify(item.nombre,"agregó")
    }
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderCarrito()
    renderTotal()
    renderCantidad()
}

function eliminarDelCarrito(id){
    const item = carrito.find((el) => el.id === id)
    item.cantidad--
    if(item.cantidad===0){
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
    }
    mensajeToastify(item.nombre,"eliminó")
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderCarrito()
    renderTotal()
    renderCantidad()
}

function renderCarrito () {
    carritoContenedor.innerHTML = ''
    let path=window.location.pathname // obtengo el path de la url donde esta ejecutando
    let ruta= path.slice(path.lastIndexOf("/"))==="/index.html" ? "":"."// comparo si estoy o no en index y dependiendo agrego "." Para poder acceder correctamente a la ruta de la imagen del producto
    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                    <img src=${ruta+item.img} alt=${item.nombre}>
                    <p>${item.nombre}</p>
                    <p> Cantidad: ${item.cantidad}</p>
                    <p> Precio Unitario: $${item.precio}</p>
                    <button onclick="eliminarDelCarrito(${item.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
        
        carritoContenedor.append(div)
    })
}

 const renderTotal=()=>{
    totalCarrito.innerText=carrito.reduce((acc,item)=>acc + (item.cantidad*item.precio),0)
 }

 const renderCantidad= ()=>{
    cantidadEnCarrito.innerText= carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
 }

 const vaciarCarro=()=>{
    carrito.length=0
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderCarrito()
    renderTotal()
    renderCantidad()
 }

 btnVaciarCarro.addEventListener("click",() =>{
    btnCerrar.click()
    Swal.fire({
        customClass:{
            confirmButton: 'boton-alert',
            cancelButton: 'boton-alert',
            icon: 'alert-icon',
            title: 'alert-title'
        },
        title: '¿Está Seguro?',
        text: "Está a punto de vaciar el carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si vaciar',
        cancelButtonText:'No, cancelar'
      }).then((result) => {
        result.isConfirmed ? vaciarCarro() : btnAbrir.click()
      })
 })

const mensajeToastify= (nombre,mensaje)=>{  //mensaje cuando agrega o elimina un producto al carrito
    let pronombre= mensaje==="eliminó" ? "del" : "al"
    Toastify({
        text: `¡Se ${mensaje} 1 ${nombre} ${pronombre} carrito!`,
        duration: 3000,
        gravity: 'bottom',
        position: 'left',
        style: {
            background: "linear-gradient(to right, #7b3c3090, #7b3c30)"
          }
    }).showToast()
}

    renderCarrito()
    renderTotal()
    renderCantidad()


