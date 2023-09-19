import Product from '../models/products.js'; 

class ProductManager {
  // Obtener todos los productos
  static async getProducts() {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  // Obtener un producto por ID
  static async getProductById(productId) {
    try {
      return await Product.findById(productId);
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }

  // Agregar un nuevo producto
  static async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      return await newProduct.save();
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }

  // Actualizar un producto por ID
  static async updateProduct(productId, updatedFields) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
      if (!updatedProduct) {
        throw new Error('Producto no encontrado');
      }
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }

  // Eliminar un producto por ID
  static async deleteProduct(productId) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        throw new Error('Producto no encontrado');
      }
      return deletedProduct;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}

export default ProductManager;
