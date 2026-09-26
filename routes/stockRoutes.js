const express = require('express');
const router = express.Router();
const { getStockPorProducto, updateStockDeposito } = require('../controllers/stockController');

router.get('/producto/:productoId', getStockPorProducto);
router.post('/actualizar', updateStockDeposito);

module.exports = router;
