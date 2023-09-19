import Cart from '../models/carts.js'; 

class CartManager {
  // Obtener un carrito por ID de usuario
  static async getCartByUserId(userId) {
    try {
      return await Cart.findOne({ user: userId }).populate('products.productId');
    } catch (error) {
      throw new Error(`Error al obtener el carrito: ${error.message}`);
    }
  }

  // Crear un nuevo carrito para un usuario
  static async createCart(userId) {
    try {
      const newCart = new Cart({ user: userId, products: [] });
      return await newCart.save();
    } catch (error) {
      throw aError(`Error al crear el carrito: ${error.message}`);
    }
  }

  // Agregar un producto al carrito
  static async addToCart(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ user: userId });

      // Busca si el producto ya existe en el carrito
      const existingProduct = cart.products.find(product => product.productId.toString() === productId);
      
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      return await cart.save();
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  // Eliminar un producto del carrito
  static async removeFromCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ user: userId });

      // Filtra los productos que no coincidan con el productId
      cart.products = cart.products.filter(product => product.productId.toString() !== productId);

      return await cart.save();
    } catch (error) {
      throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
    }
  }
}

export default CartManager;