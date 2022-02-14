
class Producto {
    constructor (nombre, precio, cantidad, id, img){
        this.nombre= nombre.toUpperCase ()
        this.precio= precio
        this.cantidad= cantidad
        this.id= id
        this.img= img
        
        
    }
}


// Array de articulos
const ListaProductos = []

ListaProductos.push  (new Producto ("Palo y Escoba Condor", 1776, 1, 1,"../img/escobaPalaCondor.jpg"))
ListaProductos.push (new Producto ("Pala Sanitaria Condor", 5125, 1, 2, "../img/palaSanitaria(4260)Italimpia.jpg"))
ListaProductos.push  (new Producto ("Paño Microfibra Pm400 Italimpia", 950, 1, 3, "../img/pañoMicrofibra.jpg"))
ListaProductos.push (new Producto ("Cesto Ventilado Redondo", 1500, 1, 4, "../img/cestoMultiusoVentiladoRedondo.jpg"))
ListaProductos.push (new Producto ("Balde Trapeador Escurridor", 3500, 1, 5, "../img/baldeTrapeadorEscurridor.jpg"))
ListaProductos.push (new Producto ("Escoba Amerimax por unidad", 242, 1, 6, "../img/escobaAmerimaxPlastica.jpg" ))
ListaProductos.push (new Producto ("Paños Montimer por unidad", 145, 1, 7,"../img/pañoMontimer.jpg"  ))
ListaProductos.push (new Producto ("Cabo Fibra De Vidrio Italimpia", 5125, 1, 8, "../img/caboDeFibraDeVidrio(1055)Italimpia.jpg"))

ListaProductos.push  (new Producto ("Brissa X 5 Lts. (sutter) Marina", 716, 1, 9,"../img/brissaX5Lts(sutter)Marina.jpg"))
ListaProductos.push (new Producto ("8m Classic X 5 Lts (diversey)", 2180, 1, 10, "../img/8mClassicX5Lts(diversey).jpg"))
ListaProductos.push  (new Producto ("Nobla Rosas Blancas X 5 Lts", 1119, 1, 11, "../img/noblaRosasBlancasX5Lts(diversey).jpg"))
ListaProductos.push (new Producto ("Limpiador Cif Baño X 5 Lts", 540, 1, 12, "../img/limpiadorCifBañoProfesionalX5Lts.jpg"))
ListaProductos.push (new Producto ("Des. Mochila Mr Musculo", 240, 1, 13, "../img/desodoranteMochilaX2Unid.MrMusculo.jpg"))
ListaProductos.push (new Producto ("Kit Auto de Molax 7unidades", 9673, 1, 14, "../img/kitMolaxAuto.jpg" ))
ListaProductos.push (new Producto ("Alcohol Etílico al 70%", 829, 1, 15,"../img/alcohol70.jpg"  ))
ListaProductos.push (new Producto ("Procenex y Lysoform", 680, 1, 16, "../img/comboLimpieza.jpg"))


 let carrito = [];
 let carritoSinDuplicados= []
    
    
 const carritoHTML = document.querySelector("#carrito");
 const miLocalStorage = window.localStorage;  
    
$(document).ready(function(){

    cargarCarritoDeLocalStorage();
    crearProductos();
    crarCarrito();

    function crearProductos() {
        for(producto of ListaProductos) {
            $("#items").append(` 
            <div class="card; col-sm-3">
            <div class="card-body">
            <h4> ${producto.nombre} </h4>
            <img src="${producto.img}" width="200px" height="200px"></img>
            <p> Precio: ${producto.precio} </p>                   
            <button class="btn btn-primary sumarCarrito" id-btn="${producto.id}" >Comprar</button>
            </div>
            </div>`
            ) 
            $("#items").css({
                "display": "flex",  "height": "60%", "width": "60%", "flex-wrap": "wrap", "justify-content": "center"
            })

            let botones =document.getElementById("items")
            botones.addEventListener ("click", agregarAlCarrito)  
        };
    }

    // Sumar al Carrito
    function agregarAlCarrito(e) {
        
        carrito.push(e.target.getAttribute("id-btn"))
        crarCarrito();
        guardarCarritoEnLocalStorage();
    }

    // Crear Carrito
    function crarCarrito() {
       
        carritoHTML.textContent = " ";
        const carritoSinDuplicados = [...new Set(carrito)];

        carritoSinDuplicados.forEach((item) => {
            const miItem = ListaProductos.filter((itemProductos) => {
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
            const miItem = ListaProductos.filter((itemProductos) => {
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
        crarCarrito();
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
});