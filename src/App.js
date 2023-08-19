const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 3000; 

const productManager = new ProductManager('products.json'); 



app.get('/products', (req, res) => {
  const limit = parseInt(req.query.limit);

  const products = productManager.getProducts();

  if (!isNaN(limit)) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});


app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);

  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// INICIALIZAR CON  node App.js