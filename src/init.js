import ProductManager from './ProductManager.js';

const productManager = new ProductManager('products.json');

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

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
productManager.updateProduct(1, { price: 12.99 });
console.log(productManager.getProducts());
console.log(productManager.deleteProduct(2));
console.log(productManager.getProducts());