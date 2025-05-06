
const CART_KEY = 'cart'

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || []
}
export function updateCartCounter(){
  let quantity = getCart();
  let cantidadCarrito = document.querySelector('#cart-count');
  cantidadCarrito.innerHTML = quantity.length; 
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

function dispatchCartUpdated(cart) {
  document.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
}

export function addToCart(product) {
  const cart = getCart()
  const existing = cart.find(item => item.id === product.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.push({ 
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    const toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    toast.fire({
      title: "Compra realizada correctamente",
      text: "El producto fue agregado por primera vez al carrito correctamente",
      icon: "success"
    });
    
  }
  saveCart(cart)
  dispatchCartUpdated(cart)
}

export function changeQuantity(id, delta) {
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (!item) return
  item.quantity = Math.max(1, item.quantity + delta)
  saveCart(cart)
  dispatchCartUpdated(cart)
}

export function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id)
  saveCart(cart)
  dispatchCartUpdated(cart)
  updateCartCounter()
}

export function clearCart() {
  saveCart([])
  dispatchCartUpdated([])
  updateCartCounter()
}
