const contenedorProductos=document.querySelector("#contenedor-productos")
const carritoContenedor=document.querySelector("#carrito-contenedor")
const totalCarrito=document.querySelector("#precioTotal")
const cantidadEnCarrito=document.querySelector("#contadorCarrito")
const btnVaciarCarro=document.querySelector("#vaciar-carrito")
let carrito
const carritoEnLs= JSON.parse(localStorage.getItem("carrito"))




//generar el DOM de toddos los productos


function cargarProductos(pagina){
    let ruta=""
    if(pagina==="productos"){
        ruta="."
    }
   
    BBDD.forEach((el)=>{ //dom deproductos para la pagina 
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
}

function agregarAlCarrito(id){
    let estaEnCarrito=false
    carrito.forEach((el)=>{
        if(el.id===id){
            el.cantidad++
            estaEnCarrito=true
            console.log(BBDD)
        }
    })
    if(!estaEnCarrito){
    let item= Object.assign({} , BBDD.find((producto)=>producto.id===id))
    item.cantidad++
    carrito.push(item)
    console.log(BBDD)
    }
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderCarrito()
    calcularTotal()
    renderCantidad()
}


function eliminarDelCarrito(id){
    const item = carrito.find((el) => el.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderCarrito()
    calcularTotal()
    renderCantidad()
}

function renderCarrito () {
    carritoContenedor.innerHTML = ''

    carrito.forEach((item) => {
        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')

        div.innerHTML = `
                    <img src=${item.img} alt=${item.nombre}>
                    <p>${item.nombre}</p>
                    <p> Cantidad:${item.cantidad}</p>
                    <p>$${item.precio}</p>
                    <button onclick="eliminarDelCarrito(${item.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `
        
        carritoContenedor.append(div)
    })
}

 const calcularTotal=()=>{
    let acumulador=0
    carrito.forEach((el)=>{
        acumulador+=el.precio
    })
    totalCarrito.innerText=acumulador
 }

 const renderCantidad= ()=>{
    cantidadEnCarrito.innerText= carrito.length
 }

 const vaciarCarro=()=>{
    carrito.length=0
    localStorage.setItem("carrito",JSON.stringify(carrito))
    renderCarrito()
    calcularTotal()
    renderCantidad()
 }

 btnVaciarCarro.addEventListener("click",vaciarCarro)

 if(carritoEnLs){
    carrito=carritoEnLs
    renderCarrito()
    calcularTotal()
    renderCantidad()
}else{
    carrito=[]
}


