import fs from 'fs';

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.carts = [];
    this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2), 'utf-8');
  }

  // Obtener todos los carritos
  getCarts() {
    return this.carts;
  }

  // Obtener un carrito por ID de usuario
  getCartByUserId(userId) {
    return this.carts.find(cart => cart.user === userId);
  }

  // Crear un nuevo carrito para un usuario
  createCart(userId) {
    const newCart = {
      id: Math.random().toString(36).substring(7),
      user: userId,
      products: []
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }


}

export default CartManager;