fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data=>{
        rederizarPaginaConProductos(data)
        renderizarCart()
    })

function rederizarPaginaConProductos(data){
    let section = document.getElementById('productos');

    let productos = data.filter(a => a.category !== "electronics")
    console.log(productos)
    productos.forEach((producto) => {

        let contenedor = document.createElement('div');
        contenedor.classList.add('col-12');
        contenedor.classList.add('col-sm-6');
        contenedor.classList.add('col-md-4');

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
              <button class="btn btn-primary w-100" id="verDetalle">Ver detalles</button>
            </div>
          </div>`;
        contenedor.classList.add('contenedores_productos');
    
         
    
        section.appendChild(contenedor);
    })
}

function renderizarCart(){
    let sectionC = document.getElementById('sizeDown');
console.log(sectionC)
    let cart = document.createElement('div');

    cart.innerHTML = `
            <div id="ocultar" class="hidde">
                <p>Cart en progreso</p>
            </div>`;
    sectionC.appendChild(cart)
}

function openCart(){

    let dom = document.getElementById("ocultar")
    let dom2 = document.getElementById("sizeDown")
    if(dom && dom2){
        dom.classList.replace("hidde", "show");
        dom2.classList.replace("oldSize","newSize")
        dom.id = "mostrar"
        dom2.id = "sizeUp"
    }else{
        let dom = document.getElementById("mostrar")
        let dom2 = document.getElementById("sizeUp")
        dom.classList.replace("show", "hidde");
        dom2.classList.replace("newSize","oldSize")
        dom.id = "ocultar"
        dom2.id = "sizeDown"
    }
    
}