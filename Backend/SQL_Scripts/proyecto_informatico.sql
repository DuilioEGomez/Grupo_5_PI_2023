-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2023 a las 16:46:51
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
(9, 1, 'Hector Andres', 'Russo', 322112231, 1),
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
(28, 1, 'Federico', 'Petrelli', 32534238, 0),
(29, 1, 'Roberto', 'Bazan', 2136548, 1),
(30, 1, 'Laura', 'Borello', 324536453, 1),
(32, 1, 'Prueba', 'Alta', 1234567, 0),
(33, 1, 'Prueba 233', 'Alta 2', 12345555, 0),
(39, 1, 'Prueba 3', 'Alta 3', 1222555, 0),
(47, 1, 'Lionel', 'Messi', 101010, 1),
(48, 1, 'Julian', 'Alvarez', 2222111, 1),
(49, 1, 'Test  aborrar', 'checking 2', 1342355, 0),
(50, 1, 'Jhon', 'doe', 17443337, 0),
(51, 1, 'Test 4', 'checking 4', 1349339, 0),
(52, 1, 'Test 6', 'checking 6', 1399389, 0),
(53, 1, 'Test 7', 'checking 7', 1399377, 0),
(54, 1, 'David', 'Grahdddam', 17126647, 0),
(55, 1, 'Test 9', 'checking 9', 1999777, 0),
(56, 1, 'Test 10', 'BORRARR', 1989787, 0),
(57, 1, 'NO se debe VER', 'DELETE', 1984587, 0),
(58, 1, 'A Borrar WEB', 'PRUEBA', 1234543, 0),
(59, 1, 'Test 21', 'BORRArrRR', 1933582, 0),
(60, 1, 'Test 34', 'BORArrRR', 19377582, 0),
(61, 1, 'A BORRAR', 'DELETE', 23243252, 0),
(63, 1, 'Ignacio', 'DELETE', 2344553, 0),
(64, 1, 'FM', 'Horizonte', 102354, 1),
(65, 1, 'Flowersddd', 'Robert', 101881, 0),
(66, 1, 'beto', 'flores', 1881961, 0),
(67, 1, 'David', 'Coverdale', 1966777, 1),
(68, 1, 'JOJOO', 'JOJOJO', 12234444, 0),
(69, 1, 'Hutchence', 'michael', 171771, 0),
(70, 1, 'A boorraraggh', 'Delete', 2324252, 0),
(71, 1, 'jajaj', 'gagag', 3232322, 0),
(72, 1, 'nonbre', 'apellido', 22333, 0),
(73, 1, 'perez', 'hvhgfhgf', 12345, 0),
(74, 1, 'Ignacio', 'Galvez', 2345664, 1),
(75, 1, 'Robert', 'Flowers', 1882223, 0),
(76, 1, 'Rock & Pop', 'FM', 10959, 1),
(77, 1, 'Rock & Pop CABA', 'FM', 1095911, 0),
(78, 1, 'Sonido', 'Juan', 42424, 1);

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
(20, 1, 30, '2023-11-06'),
(21, 1, 29, '2023-10-03'),
(22, 1, 30, '2023-11-01'),
(23, 1, 28, '2023-11-02'),
(26, 1, 30, '2023-11-14'),
(27, 1, 30, '2023-11-13'),
(28, 1, 9, '2023-11-30'),
(29, 1, 74, '2023-11-30'),
(36, 1, 76, '2023-12-02'),
(42, 1, 76, '2023-12-02'),
(43, 1, 47, '2023-12-02'),
(44, 1, 47, '2023-12-02'),
(45, 1, 47, '2023-12-02'),
(46, 1, 67, '2023-12-02'),
(47, 1, 75, '2023-12-02'),
(48, 1, 11, '2023-12-02'),
(49, 1, 10, '2023-12-02'),
(50, 1, 11, '2023-12-02'),
(57, 1, 67, '2023-12-02'),
(58, 1, 29, '2023-12-02'),
(59, 1, 48, '2023-12-02'),
(60, 1, 11, '2023-12-02'),
(61, 1, 10, '2023-12-02'),
(62, 1, 77, '2023-11-30'),
(63, 1, 77, '2023-12-02'),
(64, 1, 76, '2023-12-02'),
(65, 1, 9, '2023-12-02'),
(66, 1, 10, '2023-12-02'),
(67, 1, 9, '2023-12-02'),
(68, 1, 29, '2023-12-02'),
(69, 1, 11, '2023-12-02'),
(70, 1, 48, '2023-12-02'),
(71, 1, 11, '2023-12-02'),
(72, 1, 11, '2023-12-02'),
(73, 1, 10, '2023-12-02'),
(74, 1, 30, '2023-12-02'),
(75, 1, 47, '2023-12-02'),
(76, 1, 29, '2023-12-02'),
(77, 1, 29, '2023-12-02'),
(78, 1, 11, '2023-12-02'),
(79, 1, 11, '2023-12-02'),
(80, 1, 9, '2023-12-02'),
(81, 1, 78, '2023-12-02'),
(82, 1, 78, '2023-12-02'),
(83, 1, 78, '2023-12-02'),
(84, 1, 76, '2023-12-02'),
(85, 1, 64, '2023-12-02'),
(86, 1, 78, '2023-12-02'),
(87, 1, 78, '2023-12-02'),
(88, 1, 30, '2023-12-02'),
(89, 1, 78, '2023-12-02'),
(90, 1, 76, '2023-12-02'),
(91, 1, 67, '2023-12-02'),
(92, 1, 78, '2023-12-02'),
(93, 1, 47, '2023-12-02'),
(94, 4, 13, '2023-12-03'),
(95, 4, 14, '2023-12-03'),
(96, 4, 26, '2023-12-03'),
(97, 5, 8, '2023-12-03');

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
(15, 9, 1, 3550000.75),
(15, 10, 4, 80000.00),
(15, 11, 1, 3750000.57),
(15, 27, 4, 7666333.33),
(15, 35, 2, 150500.99),
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
(20, 25, 5, 110000.00),
(28, 10, 8, 75000.99),
(28, 26, 4, 8799.99),
(28, 35, 2, 150500.99),
(29, 1, 2, 750000.99),
(29, 2, 1, 1700000.99),
(29, 11, 1, 3750000.99),
(29, 25, 6, 105900.99),
(36, 9, 1, 3599900.75),
(36, 26, 5, 8799.99),
(42, 9, 1, 3599900.75),
(42, 11, 1, 3755999.99),
(43, 2, 1, 1700000.99),
(43, 11, 1, 3755999.99),
(44, 11, 1, 3755999.99),
(44, 26, 1, 8799.99),
(45, 11, 1, 3755999.99),
(45, 25, 1, 105999.99),
(46, 1, 1, 750000.75),
(46, 11, 1, 3755999.99),
(46, 27, 1, 7545777.75),
(47, 1, 1, 750000.75),
(47, 25, 1, 105999.99),
(48, 25, 1, 105999.99),
(48, 26, 1, 8799.99),
(50, 26, 1, 8799.99),
(57, 1, 1, 750000.75),
(57, 2, 1, 1700000.99),
(58, 2, 1, 1700000.99),
(58, 10, 1, 75999.99),
(59, 2, 1, 1700000.99),
(59, 26, 1, 8799.99),
(60, 2, 1, 1700000.99),
(61, 1, 1, 750000.75),
(63, 2, 1, 1700000.99),
(63, 10, 1, 75999.99),
(63, 25, 1, 105999.99),
(64, 1, 1, 750000.75),
(64, 2, 1, 1700000.99),
(65, 2, 1, 1700000.99),
(65, 10, 1, 75999.99),
(66, 2, 1, 1700000.99),
(66, 11, 1, 3755999.99),
(67, 11, 1, 3755999.99),
(67, 25, 1, 105999.99),
(68, 1, 5, 750000.75),
(69, 2, 5, 1700000.99),
(70, 2, 5, 1700000.99),
(71, 10, 5, 75999.99),
(72, 11, 5, 3755999.99),
(73, 31, 5, 224999.53),
(74, 1, 5, 750000.75),
(74, 10, 5, 75999.99),
(75, 25, 9, 105999.99),
(76, 2, 1, 1700000.99),
(77, 2, 1, 1700000.99),
(78, 25, 1, 105999.99),
(79, 25, 1, 105999.99),
(80, 25, 1, 105999.99),
(81, 27, 1, 7545777.75),
(82, 27, 1, 7545777.75),
(83, 9, 1, 3599900.75),
(84, 11, 1, 3755999.99),
(84, 25, 1, 105999.99),
(85, 9, 2, 3599900.75),
(85, 11, 2, 3755999.99),
(85, 25, 1, 105999.99),
(86, 11, 1, 3755999.99),
(86, 27, 1, 7545777.75),
(87, 2, 1, 1700000.99),
(87, 26, 1, 8799.99),
(88, 9, 1, 3599900.75),
(88, 10, 1, 75999.99),
(89, 10, 2, 75999.99),
(89, 26, 6, 8799.99),
(90, 2, 1, 1700000.99),
(90, 25, 3, 105999.99),
(91, 9, 1, 3599900.75),
(92, 11, 1, 3755999.99),
(93, 9, 2, 3599900.75),
(93, 25, 3, 105999.99),
(94, 3, 1, 98764.99),
(94, 5, 1, 65899.99),
(94, 23, 1, 54599.99),
(94, 24, 1, 97599.99),
(94, 43, 1, 189999.99),
(94, 46, 2, 15777.88),
(95, 4, 1, 200700.77),
(95, 22, 1, 90799.75),
(95, 23, 1, 54599.99),
(95, 24, 1, 97599.99),
(95, 45, 1, 349999.99),
(96, 3, 1, 98764.99),
(96, 23, 1, 54599.99),
(97, 7, 1, 26125.55),
(97, 16, 2, 3168.88),
(97, 18, 1, 2403.44);

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

--
-- Volcado de datos para la tabla `factura_servicios`
--

INSERT INTO `factura_servicios` (`ID_FACTURA`, `ID_SERVICIO`, `CANTIDAD`, `PRECIO_SERVICIO`) VALUES
(15, 10, 1, 12345.00),
(21, 1, 1, 12000.00),
(21, 5, 1, 7900.00),
(21, 6, 2, 8000.00),
(21, 9, 1, 23000.00),
(22, 6, 1, 8000.00),
(22, 10, 1, 7000.00),
(23, 5, 1, 7900.00),
(28, 5, 1, 7900.00),
(28, 8, 1, 15000.00),
(28, 11, 2, 3800.00),
(29, 5, 3, 7900.00),
(29, 11, 2, 3800.00),
(29, 16, 1, 75989.00),
(45, 1, 1, 12999.99),
(45, 5, 1, 7955.55),
(46, 1, 1, 12999.99),
(46, 7, 1, 7877.66),
(46, 8, 1, 15555.55),
(47, 1, 1, 12999.99),
(48, 2, 1, 8577.77),
(48, 7, 1, 7877.66),
(48, 9, 1, 23333.33),
(49, 2, 1, 8577.77),
(49, 16, 1, 75989.99),
(57, 1, 1, 12999.99),
(57, 2, 1, 8577.77),
(58, 1, 1, 12999.99),
(58, 2, 1, 8577.77),
(59, 5, 1, 7955.55),
(59, 8, 1, 15555.55),
(61, 8, 1, 15555.55),
(63, 1, 1, 12999.99),
(63, 2, 1, 8577.77),
(63, 5, 1, 7955.55),
(64, 5, 1, 7955.55),
(64, 7, 1, 7877.66),
(65, 8, 1, 15555.55),
(65, 9, 1, 23333.33),
(66, 2, 1, 8577.77),
(66, 6, 1, 8333.33),
(67, 2, 1, 8577.77),
(67, 7, 1, 7877.66),
(68, 1, 1, 12999.99),
(69, 1, 1, 12999.99),
(70, 10, 1, 7755.55),
(71, 7, 1, 7877.66),
(72, 6, 1, 8333.33),
(73, 11, 1, 3888.88),
(74, 2, 1, 8577.77),
(75, 8, 1, 15555.55),
(76, 5, 1, 7955.55),
(77, 5, 1, 7955.55),
(78, 6, 1, 8333.33),
(79, 6, 1, 8333.33),
(80, 5, 1, 7955.55),
(81, 2, 1, 8577.77),
(82, 2, 1, 8577.77),
(83, 2, 1, 8577.77),
(84, 5, 1, 7955.55),
(84, 7, 1, 7877.66),
(85, 6, 4, 8333.33),
(85, 9, 1, 23333.33),
(86, 2, 1, 8577.77),
(87, 2, 1, 8577.77),
(88, 5, 1, 7955.55),
(89, 2, 1, 8577.77),
(90, 8, 1, 15555.55),
(91, 2, 1, 8577.77),
(91, 6, 1, 8333.33),
(92, 2, 1, 8577.77),
(93, 2, 2, 8577.77),
(93, 6, 3, 8333.33),
(96, 4, 1, 8599.99),
(96, 20, 1, 4555.77),
(97, 24, 1, 5777.88),
(97, 26, 1, 3777.55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `NOMBRE_PRODUCTO` varchar(50) DEFAULT NULL,
  `STOCK_DISPONIBLE` int(11) DEFAULT NULL,
  `PRECIO` decimal(10,2) DEFAULT NULL,
  `PROVEEDOR` varchar(50) DEFAULT NULL,
  `PROVEEDOR_EMAIL` varchar(50) DEFAULT NULL,
  `ALERTA_STOCK` int(5) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID`, `ID_USUARIO`, `NOMBRE_PRODUCTO`, `STOCK_DISPONIBLE`, `PRECIO`, `PROVEEDOR`, `PROVEEDOR_EMAIL`, `ALERTA_STOCK`, `activo`) VALUES
(1, 1, 'Transmisor FM 250 Watts', 45, 750000.75, 'MAFER', 'info@maferelectronics.com.ar', 5, 1),
(2, 1, 'Procesador Digital APC542', 36, 1700000.99, 'Solidyne', 'info@solidynepro.com', 4, 1),
(3, 4, 'Motherboard MSI B520', 73, 98764.99, 'PC ONE', 'ventas@pcone.com.ar', 10, 1),
(4, 4, 'AMD Ryzen 5 7200', 89, 200700.77, 'PC ONE', 'ventas@pcone.com.ar', 10, 1),
(5, 4, 'Disco SSD 1TB Kingston', 109, 65899.99, 'VENEX', 'sales@venex.com.ar', 20, 1),
(6, 5, 'Bolsa piedritas sanitarias 25 ', 30, 4999.99, 'PiedrasPET', 'piedraspet@gmail.com', 9, 1),
(7, 5, 'Excellent cat adulto 7kg', 39, 26125.55, 'EXCELLENT', 'info@excellent.com', 10, 1),
(8, 5, 'Balanced perro adulto raza peq', 80, 6363.99, 'RAZA', 'info@razaalimentos.com', 12, 1),
(9, 1, 'Procesador Omnia Volt', 40, 3599900.75, 'Tellos Alliance', 'sales@tellosalliance.com', 7, 1),
(10, 1, 'Dipolo Abierto Soldado', 27, 75999.99, 'DS Comunicaciones', 'ds_ventas@dscomunicaciones.com.ar', 5, 1),
(11, 1, 'Consola Solidyne UDINEX 18', 45, 3755999.99, 'Solidyne', 'info@solidynepro.com', 5, 1),
(12, 6, 'Mochila estampada ', 12, 37000.00, 'Manga Mart', 'sales@mangamart.jp', 4, 1),
(13, 6, 'Espada katana', 5, 60000.00, 'Cosplay World', 'sales@cosplayworld.jp', 2, 1),
(14, 6, 'Película Blu-ray', 12, 25000.00, 'Anime Galaxy', 'blu-r_dvds@animegalaxy.jp', 3, 1),
(15, 5, ' Proplan active mind 3kg', 100, 13977.77, 'Proplan', 'ventas@proplan.com.ar', 11, 1),
(16, 5, 'Comedero acero chico', 87, 3168.88, 'Pet Accesorios', 'info@petaccesorios.com.ar', 10, 1),
(17, 5, 'Hada puff anti estres chico', 95, 11805.55, 'Pet Accesorios', 'info@petaccesorios.com.ar', 9, 1),
(18, 5, 'Correa extensible', 88, 2403.44, 'Pet Accesorios', 'info@petaccesorios.com.ar', 10, 1),
(19, 6, 'Sticker holográficos', 25, 3999.00, 'Cosmic Collects', 'sale@cosmiccollects.com', 10, 1),
(20, 6, 'Capucha Anime', 21, 29900.00, 'Otaku Emporium', 'sales@otakuemporium.co.jp', 8, 1),
(21, 6, 'Taza con diseño', 30, 11500.00, 'Anime Galaxy', 'blu-r_dvds@animegalaxy.jp', 11, 1),
(22, 4, 'Disco NVME M.2 Crucial 1TB', 104, 90799.75, 'Crucial', 'sales@crucial.com', 12, 1),
(23, 4, 'Gabinete Gamer RGB Corsair', 87, 54599.99, 'Corsair Gaming', 'sales@corsair.com', 12, 1),
(24, 4, 'Monitor Samsung 24\" FHD', 118, 97599.99, 'Samsung Argentina', 'resellers@samsung.com.ar', 20, 1),
(25, 1, 'Microfono AKG P120', 9, 105999.99, 'AKG Argentina', 'info@akg.com.ar', 10, 1),
(26, 1, 'Microfono Dinamico SHURE SM58', 17, 8799.99, 'SHURE', 'sales@shure.com', 6, 1),
(27, 1, 'Consola Capitol IP', 40, 7545777.75, 'AEQ España', 'sales@aeq.es', 8, 1),
(31, 1, 'Monitores M-Audio BX3', 45, 224999.53, 'M-Audio', 'sales@m-audio.com', 8, 1),
(32, 1, 'A BORRARRR', 12, 777999.53, 'DELETE SYSTEMS', 'sales@delete.com', 7, 0),
(33, 1, 'moto BorrARRR', 14, 555999.53, 'DELETE SYSTEMS', 'sales@delete.com', 8, 0),
(34, 1, 'Samsung A32', 14, 55588.00, 'Samsung', 'sales@samsung.com', 8, 0),
(35, 1, 'Compresor DBX286s', 54, 123456.78, 'DBX', 'sales@dbx.com', 10, 1),
(36, 1, 'oikasdhiasdhsdh', 80, 1223334.99, 'ghjasgjahsg', 'najjajj@gmail.com', 11, 0),
(37, 1, 'asaa', 20, 1234567.99, 'hampro', 'jja@jhjj.com', 10, 0),
(38, 1, 'a borrar', 40, 12345.75, 'ggg', 'gg@gg.com', 12, 0),
(39, 1, 'gggaga', 40, 12345.01, 'hhh', 'hh@hh.com', 2, 0),
(40, 1, 'ghagshagag', 40, 1234.55, 'hhh', 'aa@gmail.com', 3, 0),
(41, 1, 'Consola Soundcraft', 60, 235777.77, 'AKG', 'sales@akg.com', 12, 1),
(42, 1, 'Cable Microfono', 70, 2577.99, 'Cables ', 'cable@agr.com', 10, 1),
(43, 4, 'AMD Ryzen 3 3200G', 59, 189999.99, 'VENEX', 'sales@venex.com', 10, 1),
(44, 4, 'Intel Core i5 12th Gen', 120, 225777.88, 'intel Argentina', 'ventas@intel.com.ar', 12, 1),
(45, 4, 'Intel Core i7 13th Gen', 89, 349999.99, 'Intel Argentina', 'ventas@intel.com.ar', 10, 1),
(46, 4, 'Cooler RGB 12 Cms', 74, 15777.88, 'Coolmaster', 'ventas@pcone.com.ar', 14, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `ID` int(11) NOT NULL,
  `ID_USUARIO` int(11) DEFAULT NULL,
  `NOMBRE_SERVICIO` varchar(50) DEFAULT NULL,
  `PRECIO` decimal(10,2) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`ID`, `ID_USUARIO`, `NOMBRE_SERVICIO`, `PRECIO`, `activo`) VALUES
(1, 1, 'Ajuste de Antena en Locacion', 12999.99, 1),
(2, 1, 'Ajuste de Modulacion ', 8577.77, 1),
(3, 4, 'Armado de PC Completo', 9077.77, 1),
(4, 4, 'Limpeza PC & Cambio Pasta Termica', 8599.99, 1),
(5, 1, 'Ajuste Procesador Digital', 7955.55, 1),
(6, 1, 'Configuracion Software Automatizacion', 8333.33, 1),
(7, 1, 'Conexionado Cadena de Audio Basico', 7877.66, 1),
(8, 1, 'Conexionado Cadena de Audio Pro', 15555.55, 1),
(9, 1, 'Conexionado Cadena de Audio Pro DIGITAL', 23333.33, 1),
(10, 1, 'Configuracion Completa Streaming de Audio', 7755.55, 1),
(11, 1, 'Configuracion Basica Streaming de Audio', 3888.88, 1),
(16, 1, 'Limpieza de Transmisor', 75989.99, 1),
(18, 1, 'Conexionado AUDIO IP', 75999.99, 1),
(19, 1, 'Armado Cable Microfono', 3355.77, 1),
(20, 4, 'Actualizacion RAM ( Mano de Obra )', 4555.77, 1),
(21, 4, 'Actualizacion a SSD ( Sin backup Solo Windows )', 5333.33, 1),
(22, 4, 'Backup ( hasta 2 TB )', 2333.33, 1),
(23, 4, 'Backup ( hasta 8 TB )', 6777.77, 1),
(24, 5, 'baño completo ( perro pequeño )', 5777.88, 1),
(25, 5, 'baño completo ( Perro Grande )', 7777.88, 1),
(26, 5, 'Corte de Uñas', 3777.55, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(40) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
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
  ADD UNIQUE KEY `cuit_unique` (`CUIT`),
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
