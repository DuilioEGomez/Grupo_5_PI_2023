-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2023 a las 16:41:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_informatico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `ID` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `NOMBRE` char(30) DEFAULT NULL,
  `APELLIDO` char(30) DEFAULT NULL,
  `CUIT` int(11) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID`, `ID_USUARIO`, `NOMBRE`, `APELLIDO`, `CUIT`, `activo`) VALUES
(5, 5, 'Ana', 'Flores', 2345677, 1),
(7, 5, 'Juan', 'Perez', 23344555, 1),
(8, 5, 'Maria', 'Gonzales', 232211222, 1),
(9, 1, 'Hector', 'Russo', 322112233, 1),
(10, 1, 'Enrique', 'Nuñez', 234532122, 1),
(11, 1, 'Norberto', 'Garcia', 32424242, 1),
(12, 4, 'Carlos', 'Benitez', 32233322, 1),
(13, 4, 'Guillermo', 'Gomez', 215426732, 1),
(14, 4, 'Gerardo', 'Galvez', 321166552, 1),
(15, 6, 'Florencia', 'Lorenzo', 323232444, 1),
(16, 6, 'Graciela', 'Martinez', 1765432, 1),
(17, 6, 'Marcelo', 'Mancini', 23455668, 1),
(18, 5, 'Analia', 'Hernandez', 243624216, 1),
(19, 5, 'Natalia', 'Palma', 123234223, 1),
(20, 5, 'Martin', 'Tucci', 232344556, 1),
(21, 5, 'Sebastian', 'Fuccini', 32422233, 1),
(22, 6, 'Adrian', 'Alavarez', 345322233, 1),
(23, 6, 'Lorena', 'Albornoz', 324321578, 1),
(24, 6, 'Miriam', 'Pizzuto', 34235363, 1),
(26, 4, 'Lucas', 'Gorriti', 23435242, 1),
(27, 4, 'Marcos', 'Gutierrez', 322442258, 1),
(28, 1, 'Federico', 'Petrelli', 32534238, 1),
(29, 1, 'Roberto', 'Bazan', 2136548, 1),
(30, 1, 'Laura', 'Borello', 324536453, 1),
(32, 1, 'Prueba', 'Alta', 1234567, 1),
(33, 1, 'Prueba 2', 'Alta 2', 12345555, 1),
(34, 1, 'Prueba 2', 'Alta 2', 12345555, 1),
(35, 1, 'Prueba 2', 'Alta 2', 12345555, 1),
(36, 1, 'Prueba 2', 'Alta 2', 12345555, 1),
(37, 1, 'Prueba 2', 'Alta 2', 12345555, 1),
(38, 1, 'Prueba 2', 'Alta 2', 12345555, 1),
(39, 1, 'Prueba 3', 'Alta 3', 1222555, 1),
(40, 1, 'Prueba 3', 'Alta 3', 1222555, 1),
(41, 1, 'Prueba 3', 'Alta 3', 1222555, 1),
(42, 1, 'PrueBAAA 3', 'AltaAA 3', 1222355, 1),
(43, 1, 'PrueBAAA 3', 'AltaAA 3', 1222355, 1),
(44, 1, 'PrueBAAA 3', 'AltaAA 3', 1222355, 1),
(45, 1, 'PrueBAAA 3', 'AltaAA 3', 1222355, 1),
(46, 1, 'Test 1', 'checking 1', 1342355, 1),
(47, 1, 'Lionel', 'Messi', 101010, 1),
(48, 1, 'Julian', 'Alvarez', 2222111, 1),
(49, 1, 'Test 2', 'checking 2', 1342355, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `ID` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `ID_CLIENTE` int(11) DEFAULT NULL,
  `FECHA_FACTURA` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`ID`, `ID_USUARIO`, `ID_CLIENTE`, `FECHA_FACTURA`) VALUES
(15, 1, 9, '2023-10-19'),
(16, 1, 10, '2023-10-26'),
(17, 1, 11, '2023-11-01'),
(18, 1, 9, '2023-11-03'),
(19, 5, 5, '2023-11-02'),
(20, 1, 30, '2023-11-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_productos`
--

CREATE TABLE `factura_productos` (
  `ID_FACTURA` int(11) NOT NULL,
  `ID_PRODUCTO` int(11) NOT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `PRECIO_PRODUCTO` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_productos`
--

INSERT INTO `factura_productos` (`ID_FACTURA`, `ID_PRODUCTO`, `CANTIDAD`, `PRECIO_PRODUCTO`) VALUES
(15, 1, 1, 800000.00),
(15, 2, 1, 1500000.00),
(16, 1, 2, 799999.00),
(16, 2, 3, 1500000.00),
(18, 11, 1, 4000000.00),
(19, 6, 3, 4000.00),
(19, 7, 1, 26120.00),
(19, 8, 2, 6300.00),
(20, 1, 1, 750000.00),
(20, 9, 1, 3500000.00),
(20, 10, 4, 75000.00),
(20, 11, 1, 3750000.00),
(20, 25, 4, 110000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_servicios`
--

CREATE TABLE `factura_servicios` (
  `ID_FACTURA` int(11) NOT NULL,
  `ID_SERVICIO` int(11) NOT NULL,
  `CANTIDAD` int(11) DEFAULT NULL,
  `PRECIO_SERVICIO` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `NOMBRE_PRODUCTO` varchar(30) DEFAULT NULL,
  `STOCK_DISPONIBLE` int(11) DEFAULT NULL,
  `PRECIO` decimal(10,2) DEFAULT NULL,
  `PROVEEDOR` varchar(30) DEFAULT NULL,
  `PROVEEDOR_EMAIL` char(35) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `ALERTA_STOCK` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID`, `ID_USUARIO`, `NOMBRE_PRODUCTO`, `STOCK_DISPONIBLE`, `PRECIO`, `PROVEEDOR`, `PROVEEDOR_EMAIL`, `activo`, `ALERTA_STOCK`) VALUES
(1, 1, 'Transmisor FM 250 Watts', 10, 750000.00, 'MAFER', 'info@maferelectronics.com.ar', 1, 4),
(2, 1, 'Procesador Digital APC542', 7, 1700000.00, 'Solidyne', 'info@solidynepro.com', 1, 2),
(3, 4, 'Motherboard MSI B520', 6, 98764.00, 'PC ONE', 'ventas@pcone.com.ar', 1, 2),
(4, 4, 'AMD Ryzen 5 7200', 8, 120000.00, 'PC ONE', 'ventas@pcone.com.ar', 1, 3),
(5, 4, 'Disco SSD 1TB Kingston', 16, 50000.00, 'VENEX', 'sales@venex.com.ar', 1, 5),
(6, 5, 'Bolsa piedritas sanitarias 25 ', 30, 4000.00, 'PiedrasPET', 'piedraspet@gmail.com', 1, 9),
(7, 5, 'Excellent cat adulto 7kg', 40, 26120.00, 'EXCELLENT', 'info@excellent.com', 1, 10),
(8, 5, 'Balanced perro adulto raza peq', 35, 6360.00, 'RAZA', 'info@razaalimentos.com', 1, 12),
(9, 1, 'Procesador Omnia Volt', 5, 3500000.00, 'Tellos Alliance', 'sales@tellosalliance.com', 1, 2),
(10, 1, 'Dipolo Abierto Soldado', 16, 75000.00, 'DS Comunicaciones', 'ds_ventas@dscomunicaciones.com.ar', 1, 4),
(11, 1, 'Consola Solidyne UDINEX 18', 4, 3750000.00, 'Solidyne', 'info@solidynepro.com', 1, 1),
(12, 6, 'Mochila estampada ', 12, 37000.00, 'Manga Mart', 'sales@mangamart.jp', 1, 4),
(13, 6, 'Espada katana', 5, 60000.00, 'Cosplay World', 'sales@cosplayworld.jp', 1, 2),
(14, 6, 'Película Blu-ray', 12, 25000.00, 'Anime Galaxy', 'blu-r_dvds@animegalaxy.jp', 1, 3),
(15, 5, ' Proplan active mind 3kg', 23, 13970.00, 'Proplan', 'ventas@proplan.com.ar', 1, 11),
(16, 5, 'Comedero acero chico', 28, 3160.00, 'Pet Accesorios', 'info@petaccesorios.com.ar', 1, 10),
(17, 5, 'Hada puff anti estres chico', 18, 11800.00, 'Pet Accesorios', 'info@petaccesorios.com.ar', 1, 9),
(18, 5, 'Correa extensible', 20, 2400.00, 'Pet Accesorios', 'info@petaccesorios.com.ar', 1, 9),
(19, 6, 'Sticker holográficos', 25, 3999.00, 'Cosmic Collects', 'sale@cosmiccollects.com', 1, 10),
(20, 6, 'Capucha Anime', 21, 29900.00, 'Otaku Emporium', 'sales@otakuemporium.co.jp', 1, 8),
(21, 6, 'Taza con diseño', 30, 11500.00, 'Anime Galaxy', 'blu-r_dvds@animegalaxy.jp', 1, 11),
(22, 4, 'Disco NVME M.2 Crucial 1TB', 32, 56700.00, 'Crucial', 'sales@crucial.com', 1, 9),
(23, 4, 'Gabinete Gamer RGB Corsair', 25, 54500.00, 'Corsair Gaming', 'sales@corsair.com', 1, 8),
(24, 4, 'Monitor Samsung 24\" FHD', 26, 87900.00, 'Samsung Argentina', 'resellers@samsung.com.ar', 1, 11),
(25, 1, 'Microfono AKG P120', 29, 105900.00, 'AKG Argentina', 'info@akg.com.ar', 1, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `ID` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `NOMBRE_SERVICIO` varchar(30) DEFAULT NULL,
  `PRECIO` decimal(10,2) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`ID`, `ID_USUARIO`, `NOMBRE_SERVICIO`, `PRECIO`, `activo`) VALUES
(1, 1, 'Ajuste de Antena en Locacion', 90000.00, 1),
(2, 1, 'Ajuste de Modulacion ', 20000.00, 1),
(3, 4, 'Armado de PC Completo', 9000.00, 1),
(4, 4, 'Limpeza PC & Cambio Pasta Term', 8500.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(30) DEFAULT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `NOMBRE`, `EMAIL`, `PASSWORD`) VALUES
(1, 'DG Broadcasting', 'duilio@dgbroadcasting.com', 'henry'),
(4, 'Cousins Gamer Store', 'nacho@cousinsgamerstore.com', 'nacho'),
(5, 'Sol Naciente Pet Store', 'ticia@solnacientepetstore.com', 'pato'),
(6, 'Anime Central Store', 'lionel@animecentralstore.com', 'kion');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `factura_ibfk_1` (`ID_USUARIO`),
  ADD KEY `factura_ibfk_2` (`ID_CLIENTE`);

--
-- Indices de la tabla `factura_productos`
--
ALTER TABLE `factura_productos`
  ADD PRIMARY KEY (`ID_FACTURA`,`ID_PRODUCTO`),
  ADD KEY `ID_PRODUCTO` (`ID_PRODUCTO`);

--
-- Indices de la tabla `factura_servicios`
--
ALTER TABLE `factura_servicios`
  ADD PRIMARY KEY (`ID_FACTURA`,`ID_SERVICIO`),
  ADD KEY `ID_SERVICIO` (`ID_SERVICIO`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_USUARIO` (`ID_USUARIO`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `cliente` (`ID`);

--
-- Filtros para la tabla `factura_productos`
--
ALTER TABLE `factura_productos`
  ADD CONSTRAINT `factura_productos_ibfk_1` FOREIGN KEY (`ID_FACTURA`) REFERENCES `factura` (`ID`),
  ADD CONSTRAINT `factura_productos_ibfk_2` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `producto` (`ID`);

--
-- Filtros para la tabla `factura_servicios`
--
ALTER TABLE `factura_servicios`
  ADD CONSTRAINT `factura_servicios_ibfk_1` FOREIGN KEY (`ID_FACTURA`) REFERENCES `factura` (`ID`),
  ADD CONSTRAINT `factura_servicios_ibfk_2` FOREIGN KEY (`ID_SERVICIO`) REFERENCES `servicio` (`ID`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`);

--
-- Filtros para la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuario` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
