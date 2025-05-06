
import { getCart, changeQuantity, removeFromCart, clearCart } from '../js/cartService.js'
  
  // Seleccionar el contenedor del sidebar (o modal)
  const cartContainer = document.querySelector('#cart-container')
  const clearBtn      = document.querySelector('#cart-clear-btn')
  const checkoutBtn   = document.querySelector('#cart-checkout-btn')
  
  // Al cargar la página, pintá el carrito inicial
  document.addEventListener('DOMContentLoaded', () => {
    renderCart(getCart())
  })
  
  // Cada vez que el carrito cambie, se vuelve a renderizar
  document.addEventListener('cartUpdated', e => {
    renderCart(e.detail)
  })
  
  // Función que dibuja los items en el DOM
  function renderCart(cart) {
    cartContainer.innerHTML = ''  
    cart.forEach(item => {
      const row = document.createElement('div')
      row.className = 'cart-item d-flex align-items-center mb-2'
      row.innerHTML = `
        <img src="${item.image}" width="50" class="me-2">
        <div class="me-auto">
          <strong>${item.title}</strong><br>
          $${(item.price * item.quantity).toFixed(2)}
        </div>
        <button class="btn btn-sm btn-outline-secondary me-1">–</button>
        <span>${item.quantity}</span>
        <button class="btn btn-sm btn-outline-secondary ms-1 me-2">+</button>
        <button class="btn btn-sm btn-danger">🗑️</button>
      `

      // eventos de los botones
      const [btnMinus, btnPlus, btnDel] = row.querySelectorAll('button')
      btnMinus.onclick = () => changeQuantity(item.id, -1)
      btnPlus.onclick  = () => changeQuantity(item.id, +1)
      btnDel.onclick   = () => removeFromCart(item.id)
  
      cartContainer.append(row)
    })
  
    // Habilitar o deshabilitar botones de vaciar/checkout
    clearBtn.disabled    = cart.length === 0
    checkoutBtn.disabled = cart.length === 0
  }
  
  // Botones de vaciar carrito y finalizar compra
  clearBtn.onclick = () => clearCart()
  checkoutBtn.onclick = () => {
    clearCart()
    Swal.fire({
      title: "Compra realizada correctamente",
      text: "La factura le llegara en breve",
      icon: "success"
    });
      }
  