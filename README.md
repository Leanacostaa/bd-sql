tiendasimple-stockflow/
├── .gitignore
├── README.md
│
├── database/
│   ├── schema.sql                 # Script T-SQL de creación de BD, tablas y restricciones
│   └── seed.sql                   # Datos de prueba opcionales (Categorías, Depósitos, etc.)
│
├── backend/
│   ├── .env.example               # Plantilla de variables de entorno (sin contraseñas)
│   ├── app.js                     # Servidor principal Express
│   ├── package.json
│   ├── config/
│   │   └── db.js                  # Conexión a SQL Server mediante 'mssql'
│   ├── controllers/
│   │   ├── productoController.js
│   │   └── stockController.js
│   └── routes/
│       ├── productoRoutes.js
│       └── stockRoutes.js
│
└── frontend/
    └── index.html                 # Interfaz SPA con HTML5, CSS3 y vanilla JS (fetch)
















    # 🛒 StockFlow — Sistema de Control de Stock y Comercialización

Sistema unificado para la gestión de catálogo de productos, existencias multisucursal en depósitos físicos y control de ventas. Este proyecto contempla el desarrollo de la **Base de Datos relacional en SQL Server**, la **API REST en Node.js/Express** y una **Interfaz Web Frontend en Vanilla JavaScript**.

---

## 🛠️ Tecnologías Utilizadas

* **Base de Datos:** Microsoft SQL Server (T-SQL)
* **Backend:** Node.js, Express.js, `mssql` (Driver SQL Server), `dotenv`, `cors`
* **Frontend:** HTML5, CSS3 (Variables & Grid Layout) y JavaScript ES6+ (`async/await`, `fetch`)

---

## 📁 Estructura del Proyecto

```text
tiendasimple-stockflow/
├── database/            # Scripts SQL para creación de la base de datos
├── backend/             # API REST con arquitectura MVC/Capas
└── frontend/            # Interfaz web cliente consumiendo la API REST
