const { poolPromise, sql } = require('../config/db');

// GET: Stock de un producto específico en cada depósito (RI04)
const getStockPorProducto = async (req, res) => {
    const { productoId } = req.params;
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                d.DepositoId,
                d.Nombre AS Deposito,
                d.Ubicacion,
                ISNULL(sd.CantidadStock, 0) AS CantidadStock
            FROM DEPOSITOS d
            LEFT JOIN STOCK_DEPOSITO sd 
                ON d.DepositoId = sd.DepositoId AND sd.ProductoId = @ProductoId;
        `;
        const result = await pool.request()
            .input('ProductoId', sql.Int, productoId)
            .query(query);

        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST/PUT: Actualizar o asignar stock a un depósito
const updateStockDeposito = async (req, res) => {
    const { ProductoId, DepositoId, CantidadStock } = req.body;
    try {
        const pool = await poolPromise;
        const query = `
            MERGE STOCK_DEPOSITO AS target
            USING (SELECT @ProductoId AS ProductoId, @DepositoId AS DepositoId) AS source
            ON (target.ProductoId = source.ProductoId AND target.DepositoId = source.DepositoId)
            WHEN MATCHED THEN
                UPDATE SET CantidadStock = @CantidadStock
            WHEN NOT MATCHED THEN
                INSERT (ProductoId, DepositoId, CantidadStock) 
                VALUES (@ProductoId, @DepositoId, @CantidadStock);
        `;
        await pool.request()
            .input('ProductoId', sql.Int, ProductoId)
            .input('DepositoId', sql.Int, DepositoId)
            .input('CantidadStock', sql.Int, CantidadStock)
            .query(query);

        res.json({ message: 'Stock actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStockPorProducto, updateStockDeposito };
