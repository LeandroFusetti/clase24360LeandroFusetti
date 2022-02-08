
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
ListaProductos.push (new Producto ("Pala Sanitaria", 5125, 1, 2, "../img/palaSanitaria(4260)Italimpia.jpg"))
ListaProductos.push  (new Producto ("Paño Microfibra Pm400 Italimpia", 950, 1, 3, "../img/pañoMicrofibra.jpg"))
ListaProductos.push (new Producto ("Cesto Ventilado Redondo", 1500, 1, 4, "../img/cestoMultiusoVentiladoRedondo.jpg"))
ListaProductos.push (new Producto ("Balde Trapeador Escurridor", 3500, 1, 5, "../img/baldeTrapeadorEscurridor.jpg"))
ListaProductos.push (new Producto ("Escoba Amerimax", 242, 1, 6, "../img/escobaAmerimaxPlastica.jpg" ))
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



    
//Carrito de compras
const carrito = []
const totalcarrito = []


// variables del carrito y suma




let totalGlobal = 0
let contador = 0


$(document).ready(function(){
    
    $("#local").on("click",agregar)
        
        function agregar(e){

            if(e.target.classList.contains("btn")){
                    // Item clickeado
                    let seleccionado =  ListaProductos.find(producto => producto.id == e.target.id)

                    // Arrayd con precios de los articulos repetidos añadidos al carrito
                    totalcarrito.push(seleccionado.precio)
                    console.log(totalcarrito);

                    // Funcion comprar
                    calcularTotal()

                    // Total en el HTML
                    const totalhtml = document.getElementById("totalHTML")
                    totalhtml.textContent = `Total a pagar $ ${totalGlobal}`
                    

                    // Sumar cantidad en el carrito
                    let posicion = carrito.findIndex(enElCarrito =>  seleccionado.id == enElCarrito.id)
                   

                    if(posicion == -1){
                        carrito.push(seleccionado)  
                        
                        
                        
                    }
                    else{
                        carrito[posicion].cantidad += 1
                        
                        
                    }

                    tienda.innerHTML = " "  

                   
                    for (const producto of carrito){
                    
                        $("#tienda").append(
                                            `<div class="col-lg-3" >
                                            <img src="${producto.img}" width="100px" height="100px"></img>
                                            <h4> ${producto.nombre} </h4>
                                            <p> Precio: ${producto.precio} </p>    
                                            <p> Cantidad: ${producto.cantidad}  </p> 
                                            <button id="borrar" class="btn btn-primary btn-lg"> - </button>     
                                            </div>
                                                `
                        )
                        
                        /* $("#borrar").on("click",borrar)

                        function borrar(){
                            console.log("apretado");
                        } */
                    }
                    
                 
            }
           

            





// Boton limpiar carrito
            
                if(e.target.classList.contains("limpiarcarrito")){
                    $("#tienda").empty()
                    tienda.textContent = " "
                    carrito= []
                    totalcarrito = []
                    console.log(carrito);

                    
                    
                    }

                    
                    
            
                    
            
//Json de carrito 

                    const productosEnJson= JSON.stringify(carrito)
                    localStorage.setItem("productos" ,productosEnJson)
            
                    const carritoComprado =  JSON.parse(localStorage.getItem("productos"))
                    console.log(carritoComprado);
                
                
               
        }
        
        
    }
    
)


console.log(totalcarrito);


function calcularTotal(){
    const reducer = (x, y) => x + y
    totalGlobal = totalcarrito.reduce(reducer)
    console.log(totalGlobal);
}