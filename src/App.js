const express = require('express');
const productsRouter = require('./routes/products.js')
const cartsRouter = require('./routes/carts');

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// INICIALIZAR CON  node App.js