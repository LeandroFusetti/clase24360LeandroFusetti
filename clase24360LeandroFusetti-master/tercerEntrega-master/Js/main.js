fetch("../listaProductos.json")

    .then(response => response.json())
    .then(listaProductos => {

 let carrito = [];

 const carritoHTML = document.querySelector("#carrito");
 const miLocalStorage = window.localStorage;  
    
$(document).ready(function(){

    crearProductos();
    crearCarrito();
    cargarCarritoDeLocalStorage();

    function crearProductos() {
        for(producto of listaProductos) {
            $("#items").append(` 
            <div class="card; col-sm-3">
            <div class="card-body">
            <h4> ${producto.nombre} </h4>
            <img src="${producto.img}" width="200px" height="200px"></img>
            <p> Precio: $${producto.precio} </p>                   
            <button class="btn btn-primary sumarCarrito" id-btn="${producto.id}" >Comprar</button>
            </div>
            </div>`
            ) 
            $("#items").css({
                "display": "flex",  "height": "60%", "width": "60%", "flex-wrap": "wrap", "justify-content": "center",    
                "text-align": "center"
            })
            $("#items div").css({
                "border": "solid 1px rgb(207, 205, 205)" ,
                "border-radius": "5%",    
                "text-align": "center" 
            })

            let botones =document.getElementById("items")
            botones.addEventListener ("click", agregarAlCarrito)  
        };
    }

    // Sumar al Carrito
    function agregarAlCarrito(e) {
        
        carrito.push(e.target.getAttribute("id-btn"))
        crearCarrito();
        guardarCarritoEnLocalStorage();
    }

    // Crear Carrito
    function crearCarrito() {
       
        carritoHTML.textContent = " ";
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = listaProductos.filter((itemProductos) => {
                return itemProductos.id === parseInt(item);
                
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                 return itemId === item ? total += 1 : total; 
            }, 0);
            
            // Lista del carrito
            $("#carrito").append(
            ` 
            <ul>
            <li class="list-group-item text-right mx-2" style="text-align: center; font-size: 1.2rem;
            font-weight: 900">${numeroUnidadesItem} x ${miItem[0].nombre} - $${miItem[0].precio}
            </li>
            </ul>
            `
            )
             $("#carrito").css({
                "height": "60%", "width": "60%", 
            })
        });
        // Total en el HTML
        const totalHtml = document.querySelector("#total");
        totalHtml.textContent = calcularTotal();
    }

    // Calcular Total
    function calcularTotal() {

        return carrito.reduce((total, item) => {
            const miItem = listaProductos.filter((itemProductos) => {
                return itemProductos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0);
    }

    // Vaciar carrito
    const botonVaciar = document.querySelector("#botonVaciar");
    botonVaciar.addEventListener("click", vaciarCarrito);

    function vaciarCarrito() {
        carrito = [];
        crearCarrito();
        localStorage.clear();
    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem("carrito") !== null) {
            carrito = JSON.parse(miLocalStorage.getItem("carrito"));
        }
    }
})

})
