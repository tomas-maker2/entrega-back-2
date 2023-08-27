const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager');

const productsFile = 'productos.json';
const productManager = new ProductManager(productsFile);

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit);

  const products = productManager.getProducts();

  if (!isNaN(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const newProduct = {
    id: Math.random().toString(36).substring(7),
    ...req.body,
    status: true
  };
  const addedProduct = productManager.addProduct(newProduct);
  res.status(201).json(addedProduct);
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = productManager.updateProduct(productId, req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const deletedProduct = productManager.deleteProduct(productId);
  if (deletedProduct) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;