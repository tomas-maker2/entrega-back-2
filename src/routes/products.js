import express from 'express';
import ProductManager from '../ProductManager.js'; // Ajusta la ruta según la estructura de tus archivos

const router = express.Router();
const productsFile = 'productos.json';
const productManager = new ProductManager(productsFile);

// Ruta para mostrar la lista de productos en la vista "home"
router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

// Ruta para mostrar la lista de productos en tiempo real en la vista "realTimeProducts"
router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

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
  io.emit('updateProducts'); // Emitir evento después de agregar el producto
  
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
    io.emit('updateProducts'); // Emitir evento después de eliminar el producto
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;


// import express from 'express';
// import ProductManager from '../ProductManager.js'; // Ajusta la ruta según la estructura de tus archivos
// import path from 'path'; 

// const router = express.Router();
// const productsFile = 'productos.json';
// const productManager = new ProductManager(productsFile);

// // Ruta para mostrar la lista de productos en la vista "home"
// router.get('/', (req, res) => {
//   const products = productManager.getProducts();
//   res.render('home', { products });
// });

// // Ruta para mostrar la lista de productos en tiempo real en la vista "realTimeProducts"
// router.get('/realtimeproducts', (req, res) => {
//   const products = productManager.getProducts();
//   res.render('realTimeProducts', { products });
// });

// router.get('/', (req, res) => {
//   const limit = parseInt(req.query.limit);

//   const products = productManager.getProducts();

//   if (!isNaN(limit)) {
//     res.json(products.slice(0, limit));
//   } else {
//     res.json(products);
//   }
// });

// router.get('/:pid', (req, res) => {
//   const productId = req.params.pid;
//   const product = productManager.getProductById(productId);
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });

// router.post('/', (req, res) => {
//   const newProduct = {
//     id: Math.random().toString(36).substring(7),
//     ...req.body,
//     status: true
//   };
//   const addedProduct = productManager.addProduct(newProduct);
//   io.emit('updateProducts'); // Emitir evento después de agregar el producto
//   res.status(201).json(addedProduct);
// });

// const addedProduct = productManager.addProduct(newProduct);
// io.emit('updateProducts');

// router.put('/:pid', (req, res) => {
//   const productId = req.params.pid;
//   const updatedProduct = productManager.updateProduct(productId, req.body);
//   if (updatedProduct) {
//     res.json(updatedProduct);
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });

// router.delete('/:pid', (req, res) => {
//   const productId = req.params.pid;
//   const deletedProduct = productManager.deleteProduct(productId);
//   if (deletedProduct) {
//     io.emit('updateProducts'); // Emitir evento después de eliminar el producto
//     res.status(204).end();
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });

// const deletedProduct = productManager.deleteProduct(productId);
// io.emit('updateProducts');

// export default router;