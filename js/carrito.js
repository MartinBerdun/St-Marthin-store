const carritos = document.querySelector("#carrito")
let carrito = JSON.parse(localStorage.getItem("carrito"))

function crearCarrito() {
    carritos.innerHTML = "";
    carrito.forEach((producto) => {
        carritos.innerHTML +=
            `
                <tr>
                <td>${producto.nombre}</td>
                <td class="btn-cantidad">${producto.cantidad}</td>
                <td ><button  class="btn btnrestar" id="restar${producto.id}" ${producto.cantidad <=1 ? "disabled" : null} ><i class="fa-solid fa-circle-minus"></i>
                <button class="btn" id="sumar${producto.id}"><i class="fa-solid fa-circle-plus"></i></button</td>
                <td>$${producto.precioUn*producto.cantidad}</td>
                <td><button class="btn" id="borrar${producto.id}"><i class="fa-solid fa-trash"></i></button></td>
                </tr>`
    })
    borrarProducto()
    sumar()
    restar()
    total()
    totalProductos()
    finalizarCompra()
}

crearCarrito()

function borrarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#borrar${producto.id}`).addEventListener("click", () => {
            carrito = carrito.filter(productoFilter => productoFilter.id !== producto.id);
            crearCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })
    })
}

function sumar() {
    carrito.forEach(producto => {
        document.querySelector(`#sumar${producto.id}`).addEventListener("click", () => {
            const nuevoCarrito = carrito.map(prdCarrito => {

                if (prdCarrito.id === producto.id) {
                    const nuevaCantidad = producto.cantidad + 1
                    return {
                        ...producto,
                        cantidad: nuevaCantidad,
                    }
                }
                return prdCarrito
            })
            carrito = nuevoCarrito
            crearCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })
    })

}




function restar() {
    carrito.forEach(producto => {
        document.querySelector(`#restar${producto.id}`).addEventListener("click", () => {
            const nuevoCarrito = carrito.map(prdCarrito => {
                if (prdCarrito.id === producto.id) {
                    const nuevaCantidad = producto.cantidad - 1
                    return {
                        ...producto,
                        cantidad: nuevaCantidad,

                    }
                }
                return prdCarrito
            })
            carrito = nuevoCarrito
            crearCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })
    })
}

function total() {
    let suma = 0
    const totales = carrito.map(producto => producto.precioUn * producto.cantidad)
    for (let i = 0; i < totales.length; i++) {
        suma += totales[i]
    }
    const div = document.querySelector("#divTotal")
    div.innerHTML = `<div><p><h5>Total: $ ${suma} </h5></p>
    <button class= "btn" id="vaciar">Vaciar</button>
    <button class="btn" id="Comprar">Comprar</button></div>`
    vaciarCarrito()

    function estilos() {
        let finalizaCompra = document.querySelector("#Comprar")
        if (finalizaCompra) finalizaCompra.className = "carritobtn"

        let vaciar = document.querySelector("#vaciar")
        if (vaciar) vaciar.className = "carritobtn"
    }
    estilos()
}

function vaciarCarrito() {
    let btnVaciar = document.querySelector("#vaciar").addEventListener("click", () => {
        carrito.splice(0, carrito.length)
        localStorage.clear()
        crearCarrito()
    })
}

function totalProductos() {
    let totalProd = 0
    const totalp = carrito.map(producto => producto.cantidad)
    for (let i = 0; i < totalp.length; i++) {
        totalProd += totalp[i]
    }
    const carritospan = document.querySelector("#carritospan")
    carritospan.innerHTML = `<span>${totalProd}</span>`
}

function finalizarCompra() {
    const fincompra = document.querySelector("#Comprar").addEventListener("click", () => {
        const divcompra = document.querySelector("#divCompra")
        divcompra.innerHTML = `
        <h3>Finaliza tu compra!</h3>
            <h6>A continuación completa tus datos</h6>
    <div>
        <div class="input-group mb-3 inputContainer">
            <span class="input-group-text caja" id="basic-addon1">Nombre y Apellido</span>
            <input type="text" id="nombre" class="form-control" placeholder="Ingresá tu nombre y apellido" value=""
                aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 inputContainer">
            <span class="input-group-text caja" id="basic-addon1">Telefono</span>
            <input type="text" id="telefono" class="form-control" placeholder="Ingresá tu telefono"
                aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 inputContainer">
            <span class="input-group-text caja" id="basic-addon1">Email</span>
            <input type="text" id="email" class="form-control" placeholder="Ingresá tu email"
                aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 inputContainer">
            <span class="input-group-text caja" id="basic-addon1">Domicilio</span>
            <input type="text" id="domicilio" class="form-control" placeholder="Ingresá tu domicilio" value=""
                aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group mb-3 inputContainer">
            <label class="input-group-text caja" for="inputGroupSelect01">Medio de pago</label>
            <select class="form-select" id="inputGroupSelect01">
                <option selected>Elige una opción</option>
                <option value="1">Tarjeta de debito/credito</option>
                <option value="2">Transferencia bancaria</option>
                <option value="3">Mercado Pago</option>
            </select>
        </div>

        <button class="btn" id="btnEnviar" type="submit">Finalizar compra</button>
    </div>
        `

        function estilopagar() {
            let pagar = document.querySelector("#btnEnviar")
            if (pagar) pagar.className = "carritobtn"
        }
        estilopagar()
        btnfincompra()
    })
}

function btnfincompra() {
    const btnFinalizar = document.querySelector("#btnEnviar").addEventListener("click", () => {
        Swal.fire({
            title: 'Listo',
            text: "En 24 hs llega tu compra a tu domicilio!",
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 6000,
            background: "#D6F5FF",
        })
    })
}