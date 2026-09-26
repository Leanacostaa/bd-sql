-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE TiendaSimpleDB;
GO

USE TiendaSimpleDB;
GO

-- 2. TABLAS INDEPENDIENTES (Sin Claves Foráneas)

CREATE TABLE CATEGORIAS (
    CategoriaId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(50) NOT NULL UNIQUE,
    Descripcion NVARCHAR(200) NULL
);

CREATE TABLE DEPOSITOS (
    DepositoId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(50) NOT NULL UNIQUE,
    Ubicacion NVARCHAR(100) NOT NULL,
    CapacidadMaxima INT NULL CHECK (CapacidadMaxima > 0)
);

CREATE TABLE PROVEEDORES (
    ProveedorId INT IDENTITY(1,1) PRIMARY KEY,
    RazonSocial NVARCHAR(100) NOT NULL,
    CUIT VARCHAR(13) NOT NULL UNIQUE,
    Telefono VARCHAR(20) NULL
);

CREATE TABLE CLIENTES (
    ClienteId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(50) NOT NULL,
    Apellido NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Telefono NVARCHAR(20) NULL,
    FechaAlta DATETIME NOT NULL DEFAULT GETDATE()
);

-- 3. TABLAS DEPENDIENTES

CREATE TABLE PRODUCTOS (
    ProductoId INT IDENTITY(1,1) PRIMARY KEY,
    CategoriaId INT NOT NULL,
    ProveedorId INT NOT NULL,
    Nombre NVARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio > 0),
    CONSTRAINT FK_Productos_Categorias FOREIGN KEY (CategoriaId) REFERENCES CATEGORIAS(CategoriaId),
    CONSTRAINT FK_Productos_Proveedores FOREIGN KEY (ProveedorId) REFERENCES PROVEEDORES(ProveedorId)
);

CREATE TABLE PEDIDOS (
    PedidoId INT IDENTITY(1,1) PRIMARY KEY,
    ClienteId INT NOT NULL,
    FechaPedido DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Pedidos_Clientes FOREIGN KEY (ClienteId) REFERENCES CLIENTES(ClienteId)
);

-- 4. TABLAS ASOCIATIVAS (Claves Primarias Compuestas)

-- Inventario distribuido por depósito (Solución N:M Productos - Depósitos)
CREATE TABLE STOCK_DEPOSITO (
    ProductoId INT NOT NULL,
    DepositoId INT NOT NULL,
    CantidadStock INT NOT NULL CHECK (CantidadStock >= 0),
    PRIMARY KEY (ProductoId, DepositoId),
    CONSTRAINT FK_StockDeposito_Productos FOREIGN KEY (ProductoId) REFERENCES PRODUCTOS(ProductoId) ON DELETE CASCADE,
    CONSTRAINT FK_StockDeposito_Depositos FOREIGN KEY (DepositoId) REFERENCES DEPOSITOS(DepositoId)
);

-- Detalle/Renglones del pedido (Solución N:M Pedidos - Productos)
CREATE TABLE DETALLE_PEDIDO (
    PedidoId INT NOT NULL,
    ProductoId INT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PrecioUnitarioHistorico DECIMAL(10,2) NOT NULL CHECK (PrecioUnitarioHistorico > 0),
    PRIMARY KEY (PedidoId, ProductoId),
    CONSTRAINT FK_DetallePedido_Pedidos FOREIGN KEY (PedidoId) REFERENCES PEDIDOS(PedidoId) ON DELETE CASCADE,
    CONSTRAINT FK_DetallePedido_Productos FOREIGN KEY (ProductoId) REFERENCES PRODUCTOS(ProductoId)
);
GO
