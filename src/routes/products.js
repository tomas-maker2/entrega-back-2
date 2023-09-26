import express from 'express';
import ProductManager from '../dao/mongo/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager('productos.json');

// Ruta GET /api/products
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Convierte los parámetros de consulta en números si es necesario
    const limitNum = parseInt(limit, 10);
    const pageNum = parseInt(page, 10);

    // Realiza la consulta de productos según los parámetros
    const products = await productManager.getProducts({
      limit: limitNum,
      page: pageNum,
      sort,
      query,
    });

    // Calcula información de paginación
    const totalProducts = await productManager.getTotalProducts();
    const totalPages = Math.ceil(totalProducts / limitNum);
    const prevPage = pageNum > 1 ? pageNum - 1 : null;
    const nextPage = pageNum < totalPages ? pageNum + 1 : null;

    res.status(200).json({
      status: 'success',
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: pageNum,
      hasPrevPage: prevPage !== null,
      hasNextPage: nextPage !== null,
      prevLink: prevPage ? `/api/products?limit=${limitNum}&page=${prevPage}` : null,
      nextLink: nextPage ? `/api/products?limit=${limitNum}&page=${nextPage}` : null,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
  }
});

// Ruta GET /api/products/category/:category
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  try {
    // Realiza la búsqueda de productos por categoría y devuelve los resultados.
    const productsByCategory = await productManager.getProductsByCategory(category);
    res.json({ status: 'success', payload: productsByCategory });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Ruta GET /api/products/availability/:availability
router.get('/availability/:availability', async (req, res) => {
  const availability = req.params.availability;
  try {
    // Realiza la búsqueda de productos por disponibilidad y devuelve los resultados.
    const productsByAvailability = await productManager.getProductsByAvailability(availability);
    res.json({ status: 'success', payload: productsByAvailability });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Ruta POST /api/products
router.post('/', async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productManager.addProduct(productData);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Ruta PUT /api/products/:productId
router.put('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const updatedFields = req.body; // Debería contener los campos actualizados del producto.
  try {
    const updatedProduct = await productManager.updateProduct(productId, updatedFields);
    if (updatedProduct) {
      res.json({ status: 'success', payload: updatedProduct });
    } else {
      res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Ruta DELETE /api/products/:productId
router.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await productManager.deleteProduct(productId);
    if (deletedProduct) {
      res.json({ status: 'success', message: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Otras rutas relacionadas con productos, como actualizar y eliminar productos

export default router;

// import express from 'express';
// import ProductManager from '../dao/mongo/ProductManager.js'; 

// const router = express.Router();
// const productManager = new ProductManager('productos.json'); 

// // Ruta para mostrar la lista de productos en la vista "home"
// router.get('/', async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.render('home', { products });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener los productos' });
//   }
// });

// // Ruta para mostrar la lista de productos en tiempo real en la vista "realTimeProducts"
// router.get('/realtimeproducts', async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.render('realTimeProducts', { products });
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener los productos en tiempo real' });
//   }
// });

// // Ruta para obtener todos los productos (usando MongoDB)
// router.get('/api/products', async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener los productos' });
//   }
// });

// // Ruta para agregar un nuevo producto (usando MongoDB)
// router.post('/api/products', async (req, res) => {
//   const productData = req.body;
//   try {
//     const newProduct = await productManager.addProduct(productData);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al agregar el producto' });
//   }
// });



// export default router;

