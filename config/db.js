const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: false, // Cambiar a true si usás Azure SQL
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('✅ Conectado exitosamente a SQL Server (TiendaSimpleDB)');
        return pool;
    })
    .catch(err => {
        console.error('❌ Error de conexión a la base de datos: ', err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };
