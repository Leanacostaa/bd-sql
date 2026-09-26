const { poolPromise, sql } = require('../config/db');

// GET: Obtener todos los productos con su Stock Total calculado
const getProductos = async (req, res) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                p.ProductoId, 
                p.Nombre, 
                p.Precio, 
                c.Nombre AS Categoria, 
                pr.RazonSocial AS Proveedor,
                ISNULL(SUM(sd.CantidadStock), 0) AS StockTotal
            FROM PRODUCTOS p
            INNER JOIN CATEGORIAS c ON p.CategoriaId = c.CategoriaId
            INNER JOIN PROVEEDORES pr ON p.ProveedorId = pr.ProveedorId
            LEFT JOIN STOCK_DEPOSITO sd ON p.ProductoId = sd.ProductoId
            GROUP BY p.ProductoId, p.Nombre, p.Precio, c.Nombre, pr.RazonSocial;
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST: Registrar nuevo producto
const createProducto = async (req, res) => {
    const { CategoriaId, ProveedorId, Nombre, Precio } = req.body;
    try {
        const pool = await poolPromise;
        const query = `
            INSERT INTO PRODUCTOS (CategoriaId, ProveedorId, Nombre, Precio)
            OUTPUT INSERTED.*
            VALUES (@CategoriaId, @ProveedorId, @Nombre, @Precio);
        `;
        const result = await pool.request()
            .input('CategoriaId', sql.Int, CategoriaId)
            .input('ProveedorId', sql.Int, ProveedorId)
            .input('Nombre', sql.NVarChar(100), Nombre)
            .input('Precio', sql.Decimal(10, 2), Precio)
            .query(query);

        res.status(201).json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProductos, createProducto };
