const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  addProduct(product) {
    const id = this.products.length + 1; 
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
      return this.products[productIndex];
    }
    return null;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}

const productManager = new ProductManager('products.json');
module.exports = ProductManager;

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10.99,
  thumbnail: 'path/to/thumbnail1.jpg',
  code: 'P123',
  stock: 50
});

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 19.99,
  thumbnail: 'path/to/thumbnail2.jpg',
  code: 'P456',
  stock: 30
});
productManager.addProduct({
  title: 'Producto 3',
  description: 'Descripción del producto 3',
  price: 19.99,
  thumbnail: 'path/to/thumbnail2.jpg',
  code: 'P456',
  stock: 30
});

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
productManager.updateProduct(1, { price: 12.99 });
console.log(productManager.getProducts());
console.log(productManager.deleteProduct(2));
console.log(productManager.getProducts());