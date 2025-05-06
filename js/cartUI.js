
import { getCart, changeQuantity, removeFromCart, clearCart } from '../js/cartService.js'
  
  const cartContainer = document.querySelector('#cart-container')
  const clearBtn      = document.querySelector('#cart-clear-btn')
  const checkoutBtn   = document.querySelector('#cart-checkout-btn')
  
  document.addEventListener('DOMContentLoaded', () => {
    renderCart(getCart())
  })
  
  document.addEventListener('cartUpdated', e => {
    renderCart(e.detail)
  })
  
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

      const [btnMinus, btnPlus, btnDel] = row.querySelectorAll('button')
      btnMinus.onclick = () => changeQuantity(item.id, -1)
      btnPlus.onclick  = () => changeQuantity(item.id, +1)
      btnDel.onclick   = () => removeFromCart(item.id)
  
      cartContainer.append(row)
    })
  
    clearBtn.disabled    = cart.length === 0
    checkoutBtn.disabled = cart.length === 0
  }
  
  clearBtn.onclick = () => clearCart()
  checkoutBtn.onclick = () => {
    clearCart()
    Swal.fire({
      title: "Compra realizada correctamente",
      text: "La factura le llegara en breve",
      icon: "success"
    });
      }
  