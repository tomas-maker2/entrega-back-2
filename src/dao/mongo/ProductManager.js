import Product from '../models/products.js';

class ProductManager {
  // Obtener todos los productos con paginación, ordenamiento y búsqueda opcional
  static async getProducts({ limit = 10, page = 1, sort, query } = {}) {
    try {
      const skip = (page - 1) * limit;
      const filter = query ? { $text: { $search: query } } : {};
      const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions);

      return products;
    } catch (error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
  }

  // Obtener el número total de productos para la paginación
  static async countProducts() {
    try {
      return await Product.countDocuments();
    } catch (error) {
      throw new Error(`Error al contar los productos: ${error.message}`);
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
      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, {
        new: true,
      });
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

  // Buscar productos por categoría
  static async getProductsByCategory(category) {
    try {
      const productsByCategory = await Product.find({ category });
      return productsByCategory;
    } catch (error) {
      throw new Error(`Error al obtener productos por categoría: ${error.message}`);
    }
  }

  // Buscar productos por disponibilidad
  static async getProductsByAvailability(availability) {
    try {
      const productsByAvailability = await Product.find({ availability });
      return productsByAvailability;
    } catch (error) {
      throw new Error(`Error al obtener productos por disponibilidad: ${error.message}`);
    }
  }
}

export default ProductManager;
