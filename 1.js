const BBDD = [
    { id: 1, nombre: "producto1", precio: 1000, stock: 10 },
    { id: 2, nombre: "producto2", precio: 2000, stock: 10 },
    { id: 3, nombre: "producto3", precio: 3000, stock: 10 },
]
const carrito = []

class Productos {
    constructor(id, nombre, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}
function mostrarCarrito() {
    let string = ""
    let total = 0
    carrito.forEach(element => {
        string += "ID: " + element.id + ", Nombre: " + element.nombre + ", Cantidad: " + element.cantidad + ", Precio: " + element.precio + "\n";
        total += element.cantidad * element.precio
    });
    return string + "\nTotal: " + total
}

function mostrarProductos() {
    let string = ""
    BBDD.forEach(element => {
        string += "ID: " + element.id + ", Nombre: " + element.nombre + ",  Precio: " + element.precio + ",  Stock: " + element.stock + "\n";
    });
    return string
}

function agregarProducto() {
    let continuar = "S"
    let id = -100
    let idRepetido = false
    let nombre = ""
    let nombreRepetido = false

    do {
        do {
            id = Number(prompt("BBDD actual:\n\n" + mostrarProductos()+"\nIngrese el ID del producto a agregar"))
            idRepetido = BBDD.some((el) => el.id === id)
            if (idRepetido) {
                alert("ID existente, ingrese otro")
            }
        } while (idRepetido === true)
        do {
            nombre = prompt("BBDD actual:\n\n" + mostrarProductos()+"\nIngrese el nombre del producto")
            nombreRepetido = BBDD.some((el) => el.nombre === nombre)
            if (nombreRepetido) {
                alert("Nombre  existente, ingrese otro")
            }
        } while (nombreRepetido)
        let precio = Number(prompt("Ingrese el precio del producto"))
        let stock = Number(prompt("Ingrese la cantidad de stock del producto"))
        BBDD.push(new Productos(id, nombre, precio, stock))
        continuar = prompt("¿Deseas agregar otro producto? Ingresa:\ns para si\nn para no").toUpperCase()
    } while (continuar === "S")
    alert("Así quedó la BBDD:" + "\n\n" + mostrarProductos())
}


function eliminar(array) {

    let id = -100
    let index = -100
    let continuar = "S"
    do {
        if (array.length === 0) {
            break
        }
        if (array === BBDD) {
            do {
                id = Number(prompt("Ingresa el ID del producto a eliminar\n\n" + mostrarProductos()))
                index = array.findIndex(elemento => elemento.id === id)
                if (index === -1) {
                    alert("ID incorrecto, intente denuevo")
                }
            } while (index === -1)
            array.splice(index, 1)
            alert("Asi quedó la BBDD:\n\n" + mostrarProductos())
        } else {
            do {
                id = Number(prompt("Ingresa el ID del producto a eliminar\n\n" + mostrarCarrito()))
                index = array.findIndex(elemento => elemento.id === id)
                if (index === -1) {
                    alert("ID incorrecto, intente denuevo")
                }
            } while (index === -1)
            array[index].cantidad--
            if (array[index].cantidad === 0) {
                array.splice(index, 1)
            }
            alert("Asi quedó el carrito:\n\n" + mostrarCarrito())
        }
        if (array.length > 0) {
            continuar = prompt("¿Deseas eliminar otro producto? Ingresa:\ns para si\nn para no").toUpperCase()
        }
    } while (continuar === "S")
}

function agregarCarrito() {
    let continuar = "S"
    let index = 0
    let cantidad = 0
    let seleccion = ""
    do {
        do {
            seleccion = Number(prompt("Ingrese el ID del producto que desea agregar al carrito\n\n" + mostrarProductos()))
            index = BBDD.findIndex(elemento => elemento.id === seleccion)
            if (index === -1) {
                alert(seleccion + " No existe, intente denuevo")
            }
        } while (index === -1)
        do {
            cantidad = Number(prompt("Ingrese la cantidad que desea agregar"))
            if (BBDD[index].stock < cantidad) {
                alert("El stock actual de " + BBDD[index].nombre + " es de " + BBDD[index].stock + ". Intente un numero menor")
            }
        } while (BBDD[index].stock < cantidad)
        carrito.push({ id: BBDD[index].id, nombre: BBDD[index].nombre, precio: BBDD[index].precio, cantidad: cantidad })
        BBDD[index].stock -= cantidad
        continuar = prompt("¿Deseas agregar otro producto? Ingresa:\ns para si\nn para no").toUpperCase()

    } while (continuar === "S")
    alert("Este es tu carrito:" + "\n\n" + mostrarCarrito())
}
function menuPrincipal() {
    let menu = -1;
    do {
        menu = Number(prompt("Menú Principal, ingrese:\n\n1 para mostrar la BBDD\n2 para agregar productos a la BBDD\n3 para agregar productos al carrito\n4 para mostrar carrito\n5 para eliminar un producto de la BBDD\n6 para elimimnar un producto del carrito"))
        switch (menu) {
            case 1:
                alert(mostrarProductos())
                break
            case 2:
                agregarProducto()
                break
            case 3:
                if (BBDD.length === 0) {
                    alert("La BBDD esta vacía, agregue productos")
                } else {
                    agregarCarrito()
                }

                break
            case 4:
                alert(mostrarCarrito())
                break
            case 5:
                eliminar(BBDD)
                break
            case 6:
                if (carrito.length === 0) {
                    alert("El carrito está Vacío")
                } else {
                    eliminar(carrito)
                }

                break
        }
        if (!(menu > 0 && menu < 7)) {
            alert("El numero ingresado es incorrecto, intente denevo")
        }
    } while (!(menu > 0 && menu < 7))
}
let continuarMenu = "S"
do {
    menuPrincipal()
    continuarMenu = prompt("¿Deseas volver al menú principal? Ingresa:\ns para si\nn para no").toUpperCase()
} while (continuarMenu === "S")

