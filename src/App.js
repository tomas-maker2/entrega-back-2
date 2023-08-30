import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js'; // Importa ProductManager

const app = express();
const port = 8080;
const httpServer = http.createServer(app); // Crea el servidor HTTP
const io = new Server(httpServer); // Crea la instancia de io
const productManager = new ProductManager('productos.json', io); // Pasa io al constructor

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Escucha en el servidor HTTP en lugar de directamente en app
httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// import express from 'express';
// import productsRouter from './routes/products.js';
// import cartsRouter from './routes/carts.js';
// import expressHandlebars from 'express-handlebars';
// import http from 'http';
// import {Server} from 'socket.io';


// const app = express();
// const port = 8080;
// const io = new Server(httpServer)
// const server = http.createServer(app);
// const productManager = new ProductManager('productos.json', io);


// app.engine('handlebars', expressHandlebars());
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
// INICIALIZAR CON  node App.js