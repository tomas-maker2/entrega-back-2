import express from 'express';
import CartManager from '../dao/mongo/CartManager.js';

const router = express.Router();
const cartManager = new CartManager('carrito.json');

// Ruta POST /api/carts
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al crear el carrito' });
  }
});

// Ruta GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json({ status: 'success', payload: cart });
    } else {
      res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al obtener el carrito' });
  }
});

// Ruta DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const deletedCart = await cartManager.deleteCart(cartId);
    if (deletedCart) {
      res.json({ status: 'success', message: 'Carrito eliminado correctamente' });
    } else {
      res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al eliminar el carrito' });
  }
});

// Ruta POST /api/carts/:cid/products
router.post('/:cid/products', async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body.products;
  try {
    const updatedCart = await cartManager.updateCart(cartId, products);
    if (updatedCart) {
      res.json({ status: 'success', payload: updatedCart });
    } else {
      res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al actualizar el carrito' });
  }
});

// Ruta PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  try {
    const updatedCart = await cartManager.updateProductQuantity(cartId, productId, quantity);
    if (updatedCart) {
      res.json({ status: 'success', payload: updatedCart });
    } else {
      res.status(404).json({ status: 'error', error: 'Carrito o producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al actualizar la cantidad del producto' });
  }
});

// Ruta DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const updatedCart = await cartManager.removeProduct(cartId, productId);
    if (updatedCart) {
      res.json({ status: 'success', payload: updatedCart });
    } else {
      res.status(404).json({ status: 'error', error: 'Carrito o producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al eliminar el producto del carrito' });
  }
});

export default router;

// import express from 'express';
// import CartManager from '../dao/mongo/CartManager.js' 

// const router = express.Router();
// const cartsFile = 'carrito.json'; 
// const cartManager = new CartManager(cartsFile); 

// // Ruta para crear un nuevo carrito
// router.post('/', async (req, res) => {
//   try {
//     const newCart = await cartManager.createCart();
//     res.status(201).json(newCart);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al crear el carrito' });
//   }
// });

// // Ruta para obtener un carrito por ID
// router.get('/:cid', async (req, res) => {
//   const cartId = req.params.cid;
//   try {
//     const cart = await cartManager.getCartById(cartId);
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).json({ message: 'Cart not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el carrito' });
//   }
// });

// // Ruta para agregar un producto a un carrito
// router.post('/:cid/product/:pid', async (req, res) => {
//   const cartId = req.params.cid;
//   const productId = req.params.pid;
//   const quantity = req.body.quantity || 1;

//   try {
//     const cart = await cartManager.addToCart(cartId, productId, quantity);
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).json({ message: 'Cart not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al agregar el producto al carrito' });
//   }
// });



// export default router;