import fs from 'fs';

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  // Obtener todos los productos
  getProducts() {
    return this.products;
  }

  // Obtener un producto por ID
  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  // Agregar un nuevo producto
  addProduct(productData) {
    const id = this.products.length + 1;
    const newProduct = { id, ...productData };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  // Actualizar un producto por ID
  updateProduct(productId, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
      return this.products[productIndex];
    }
    return null;
  }

  // Eliminar un producto por ID
  deleteProduct(productId) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}

export default ProductManager;