import express from 'express';
import ProductManager from '../dao/mongo/ProductManager.js'; 

const router = express.Router();
const productManager = new ProductManager('productos.json'); 

// Ruta para mostrar la lista de productos en la vista "home"
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para mostrar la lista de productos en tiempo real en la vista "realTimeProducts"
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos en tiempo real' });
  }
});

// Ruta para obtener todos los productos (usando MongoDB)
router.get('/api/products', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para agregar un nuevo producto (usando MongoDB)
router.post('/api/products', async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productManager.addProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});



export default router;

