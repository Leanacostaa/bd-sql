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
