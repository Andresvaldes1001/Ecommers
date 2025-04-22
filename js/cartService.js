
const CART_KEY = 'cart'

// Leer el carrito (o devolver array vacío)
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || []
}

// Guardar carrito en localStorage
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// Emitir evento interno para notificar cambios
function dispatchCartUpdated(cart) {
  document.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
}

// Agregar producto (si ya existe, suma 1 a quantity)
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
  }
  saveCart(cart)
  dispatchCartUpdated(cart)
}

// Cambiar cantidad (+1 o –1)
export function changeQuantity(id, delta) {
  const cart = getCart()
  const item = cart.find(i => i.id === id)
  if (!item) return
  item.quantity = Math.max(1, item.quantity + delta)
  saveCart(cart)
  dispatchCartUpdated(cart)
}

// Eliminar un producto completo
export function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id)
  saveCart(cart)
  dispatchCartUpdated(cart)
}

// Vaciar todo el carrito
export function clearCart() {
  saveCart([])
  dispatchCartUpdated([])
}
