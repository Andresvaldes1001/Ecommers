import { addToCart, updateCartCounter } from '../js/cartService.js'


async function fetchAndRenderProducts() {
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data=>{
        rederizarPaginaConProductos(data)
    })
}


function rederizarPaginaConProductos(data){
    let section = document.getElementById('productos');

    let productos = data.filter(a => a.category !== "electronics")
    console.log(productos)
    productos.forEach((producto) => {

        let contenedor = '';
        contenedor = document.createElement('div');
        contenedor.classList.add('col-12');
        contenedor.classList.add('col-sm-6');
        contenedor.classList.add('col-md-4');
        contenedor.classList.add('contenedores_productos');

        contenedor.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img
              src="${producto.image}"
              class="card-img-top img-fluid"
              alt="${producto.title}"
            />
            <div class="card-body">
              <h5 class="card-title">${producto.title}</h5>
              <p class="card-text">$ ${producto.price}</p>
              <button class="btn btn-primary w-100" id="verDetalle${producto.id}">Ver detalles</button>
            </div>
          </div>`;
        section.appendChild(contenedor);
    
        let showDetails = document.getElementById(`verDetalle${producto.id}`)
        showDetails.onclick = () => mostrarDetalles(producto);
    })
    updateCartCounter()
}

function mostrarDetalles(producto){
    console.log("entro")

    let sectionModal = document.getElementById('myModal');
    sectionModal.innerHTML = '';
    sectionModal.style.display = "block";
   
    console.log(sectionModal)

    let modal = document.createElement('div');

    modal.classList.add('modal-content');
    modal.innerHTML = ` `
    modal.innerHTML = `
    <span class="close">&times;</span>
    <div class="card h-100 shadow-sm">
            <img
              src="${producto.image}"
              class="card-img-top img-fluid"
              alt="${producto.title}"
            />
            <div class="card-body">
              <h5 class="card-title">${producto.title}</h5>
              <h6 class="card-title">${producto.description}</h6>
              <p class="card-text">$ ${producto.price}</p>
              <button class="btn btn-primary w-100" id="addCarrito">Agregar al Carrito</button>
            </div>
          </div>
    `;
    modal.querySelector('button').onclick = () => {
        addToCart(producto)
        updateCartCounter()
    }
    sectionModal.appendChild(modal);
    let span = document.getElementsByClassName("close")[0];
    console.log(span)
    span.onclick = () => sectionModal.style.display = "none";
    window.onclick = function(event) {
        if (event.target == sectionModal) {
            sectionModal.style.display = "none";
        }
    }
    
}

document.addEventListener('DOMContentLoaded', fetchAndRenderProducts)
