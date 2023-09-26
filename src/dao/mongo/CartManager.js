import Cart from '../models/carts.js';
import Product from '../models/products.js';

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
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  }

  // Agregar un producto al carrito
  static async addToCart(userId, productId, quantity) {
    try {
      const cart = await Cart.findOne({ user: userId });

      // Busca si el producto ya existe en el carrito
      const existingProduct = cart.products.find(
        (product) => product.productId.toString() === productId
      );

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
  async removeFromCart(cartId, productId) {
    // Encuentra el carrito por cartId
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return null; // Carrito no encontrado
    }

    // Filtra los productos para eliminar el que tenga productId
    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== productId
    );

    // Guarda el carrito actualizado
    await cart.save();

    return cart;
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateProductQuantity(cartId, productId, action) {
    // Encuentra el carrito por cartId
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return null; // Carrito no encontrado
    }

    // Encuentra el producto en el carrito por productId
    const productInCart = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (!productInCart) {
      return null; // Producto no encontrado en el carrito
    }

    // Actualiza la cantidad del producto según la acción
    if (action === 'increment') {
      productInCart.quantity += 1;
    } else if (action === 'decrement') {
      productInCart.quantity -= 1;
      if (productInCart.quantity < 1) {
        // Si la cantidad se vuelve 0 o negativa, elimina el producto del carrito
        cart.products = cart.products.filter(
          (product) => product.productId.toString() !== productId
        );
      }
    }

    // Guarda el carrito actualizado
    await cart.save();

    return cart;
  }

  // Lógica para calcular el precio total de los productos en el carrito
  async calculateTotalPrice(productsInCart) {
    let totalPrice = 0;

    // Itera a través de los productos en el carrito
    for (const productInfo of productsInCart) {
      const productId = productInfo.productId;
      const quantity = productInfo.quantity;

      // Encuentra el producto en la base de datos
      const product = await Product.findById(productId);

      if (!product) {
        // Maneja el caso en el que el producto ya no existe en la base de datos
        // Puedes eliminarlo del carrito o mostrar un mensaje al usuario
        continue;
      }

      // Calcula el precio subtotal del producto (precio * cantidad)
      const subtotal = product.price * quantity;

      // Agrega el subtotal al precio total
      totalPrice += subtotal;
    }

    return totalPrice;
  }

  // Lógica para marcar los productos como comprados y realizar el proceso de compra
  async checkout(cartId) {
    // Encuentra el carrito por cartId
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return { success: false, error: 'Carrito no encontrado' };
    }

    // Obtén la lista de productos en el carrito
    const productsInCart = cart.products;

    // Realiza cálculos de precios y control de inventario
    const totalPrice = await this.calculateTotalPrice(productsInCart);
    if (totalPrice === null) {
      return { success: false, error: 'Error al calcular el precio total' };
    }

    // Implementa lógica de procesamiento de pago aquí
    // Esto podría incluir integración con pasarelas de pago, generación de facturas, etc.
    const paymentResult = await this.processPayment(totalPrice); // Implementa esta función según tus requerimientos

    if (!paymentResult.success) {
      return { success: false, error: 'Error al procesar el pago' };
    }

    // Marca los productos como comprados y actualiza el carrito
    const purchaseResult = await this.markProductsAsPurchased(productsInCart); // Implementa esta función según tus requerimientos

    if (!purchaseResult.success) {
      return { success: false, error: 'Error al marcar los productos como comprados' };
    }

    // Limpia el carrito
    cart.products = [];

    // Guarda el carrito actualizado
    await cart.save();

    return { success: true, totalPrice };
  }

  // Lógica para procesar el pago (debe implementarse según tus requerimientos)
  async processPayment(totalPrice) {
    // Implementa la lógica para procesar el pago aquí (por ejemplo, integración con pasarelas de pago)
    // Devuelve un objeto con { success: true } si el pago se procesa correctamente, o { success: false, error: 'Mensaje de error' } en caso de fallo.
    // Puedes adaptar esta función según las necesidades de tu proyecto.
    return { success: true };
  }

  // Lógica para marcar los productos como comprados (debe implementarse según tus requerimientos)
  async markProductsAsPurchased(productsInCart) {
    // Implementa la lógica para marcar los productos como comprados aquí
    // Esto podría incluir la actualización del estado de los productos en la base de datos y otras acciones relacionadas con la compra.
    // Devuelve un objeto con { success: true } si la operación se realiza correctamente, o { success: false, error: 'Mensaje de error' } en caso de fallo.
    // Puedes adaptar esta función según las necesidades de tu proyecto.
    return { success: true };
  }
}

export default CartManager;