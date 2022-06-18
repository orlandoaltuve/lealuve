const contenedorProductos=document.querySelector("#contenedor-productos")
const carritoContenedor=document.querySelector("#carrito-contenedor")
const totalCarrito=document.querySelector("#precioTotal")
const cantidadEnCarrito=document.querySelector("#contadorCarrito")
const carrito=[]

//generar el DOM de toddos los productos

BBDD.forEach((el)=>{
    const div=document.createElement("div")
    div.classList.add("cardP")
    div.innerHTML= `
                <img src=${el.img} alt=${el.nombre}>
                <p class="nombreProducto">${el.nombre}</p>
                <P class="precioProducto">$${el.precio}</P>
                <button onclick="agregarAlCarrito(${el.id})" class="boton-principal"> Agregar </button>
                    `

    contenedorProductos.append(div)

})

function agregarAlCarrito(id){
    let item= BBDD.find((producto)=>producto.id===id)
    carrito.push(item)
    console.log(carrito)
    renderCarrito()
    calcularTotal()
    renderCantidad()
}


function eliminarDelCarrito(id){
    const item = carrito.find((el) => el.id === id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
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
                    <p>${item.nombre}</p>
                    <p>Precio: $${item.precio}</p>
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







