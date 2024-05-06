export function addToCart(product) {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(product);
    localStorage.setItem('cart', JSON.stringify(existingCart));
  }
  
  export function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  export function removeProductFromCart(id) {
    let existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart = existingCart.filter(item => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(existingCart));
  }
  