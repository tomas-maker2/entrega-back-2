import express from 'express';
import fs from 'fs';

const router = express.Router();
const cartsFile = 'carrito.json';

function readJSONFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeJSONFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}

router.post('/', (req, res) => {
  const newCart = {
    id: Math.random().toString(36).substring(7),
    products: []
  };
  const carts = readJSONFile(cartsFile);
  carts.push(newCart);
  writeJSONFile(cartsFile, carts);
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const carts = readJSONFile(cartsFile);
  const cart = carts.find(c => c.id === cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity || 1;

  const carts = readJSONFile(cartsFile);
  const cartIndex = carts.findIndex(c => c.id === cartId);
  const product = { product: productId, quantity };

  if (cartIndex !== -1) {
    const cart = carts[cartIndex];
    const existingProductIndex = cart.products.findIndex(p => p.product === productId);

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push(product);
    }

    writeJSONFile(cartsFile, carts);
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

export default router;