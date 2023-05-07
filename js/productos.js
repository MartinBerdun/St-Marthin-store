const contenedor = document.getElementById("containerProductos")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const loader = document.querySelector("#loader")
let contenidohtml = ""
let fetcharray = []

const cargaProductos = async () => {
    await fetch("../js/producto.json")
        .then((response) => response.json())
        .then((data) => {
            fetcharray = data
            fetcharray.forEach(contenido => {
                contenidohtml += cardFetch(contenido)
            });
            contenedor.innerHTML = contenidohtml
            agregarProductos()
        })
        .catch((error) => {
            contenedor.innerHTML = avisoerror()
        })
        .finally(() => loader.innerHTML = "")
}

cargaProductos()

const cardFetch = (contenido) => {
    return `
    <div class="card">
    <img src=${contenido.img} alt="buzos">
    <h4>${contenido.nombre}</h4>
    <p>$${contenido.precioUn}</p>
    <button class="botonAgregar" id="agregar${contenido.id}">Agregar al Carrito</button>
</div>
    `
}

const avisoerror = () => {
    return `
            <div>
            <img src="../img/icon1.png" alt="">
            <p>Ha ocurrido un error!</p>
            <p>Intente nuevamente</p>
            </div>
`
}

function agregarProductos() {
    fetcharray.forEach(contenido => {
        document.querySelector(`#agregar${contenido.id}`).addEventListener("click", () => {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
            })
            Toast.fire({
                icon: 'success',
                title: 'Se agregó al carrito'
            })
            agregarAlCarrito(contenido)
            totalProductos()
            localStorage.setItem("carrito", JSON.stringify(carrito));
            
        })
    })
}

function agregarAlCarrito(contenido) {
    let existe = carrito.some((productoSome) => productoSome.id === contenido.id)

    existe ? existeProducto() : noexisteProducto()

    function noexisteProducto() {
        contenido.cantidad = 1;
        carrito.push(contenido)
    }


    function existeProducto() {
        let prodFind = carrito.find((productoFind) => productoFind.id === contenido.id);
        prodFind.cantidad++
    }
}

function totalProductos (){
    let totalProd = 0
    const totalp = carrito.map (producto=>producto.cantidad)
    for (let i = 0; i<totalp.length; i++ ){
        totalProd += totalp[i]
    }
    const carritospan = document.querySelector("#carritospan")
    carritospan.innerHTML = `<span>${totalProd}</span>`
}

totalProductos()


//  TABLAS PARA ACTUALZAR STOCK DE PRENDAS

function agregarTalles(asd) {
    const talles = document.getElementById("talles");

    if (!talles) return 'no hay talles'

    tallesEnStock.forEach((talle) => {
        talles.innerHTML += `

                            <tr>
                            <td>${talle.talle}</td>
                            <td>${talle.pecho}</td>
                            <td>${talle.manga}</td>
                            <td>${talle.largo}</td>
                        </tr>
                            `;
    });
}

agregarTalles();

function agregarZapa() {
    const tallesZapatillas = document.getElementById("tallesZapa");

    if (!tallesZapatillas) return

    zapatillas.forEach((zapa) => {
        tallesZapatillas.innerHTML += `
                                        <tr>
                                            <td>${zapa.talle}</td>
                                            <td>${zapa.medida}</td>
                                            <td>${zapa.eu}</td>
                                        </tr>
        `;
    });
}

agregarZapa();

// ESILOS DE LAS TABLAS 

function estilos() {
    let remera = document.getElementById("remeras");
    if (remera) remera.className = "colorazul";

    let zapa = document.getElementById("zapa");
    if (zapa) zapa.className = "colorazul"
}
estilos();








