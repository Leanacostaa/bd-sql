const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productoRoutes = require('./routes/productoRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API REST
app.use('/api/productos', productoRoutes);
app.use('/api/stock', stockRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
