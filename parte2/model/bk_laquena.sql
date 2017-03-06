CREATE DATABASE  IF NOT EXISTS `laquena` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `laquena`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: laquena
-- ------------------------------------------------------
-- Server version	5.7.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clasification`
--

DROP TABLE IF EXISTS `clasification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clasification` (
  `clasificationId` int(11) NOT NULL,
  `description` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`clasificationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasification`
--

LOCK TABLES `clasification` WRITE;
/*!40000 ALTER TABLE `clasification` DISABLE KEYS */;
/*!40000 ALTER TABLE `clasification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `iso31661Code` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `name` varchar(70) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`iso31661Code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('CL','CHILE'),('ES','España');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `currencyId` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`currencyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES ('CLP','Pesos Chilenos'),('EUR','Euro'),('USD','US Dollar');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `establecimiento`
--

DROP TABLE IF EXISTS `establecimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `establecimiento` (
  `establecimientoId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `legalName` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `manager` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `iso31661Code` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `streetAdress` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `addressRegion` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `adressLocality` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `latitude` decimal(11,7) DEFAULT NULL,
  `longitude` decimal(11,7) DEFAULT NULL,
  `ratingValue` decimal(3,2) DEFAULT NULL,
  `reviewCount` int(11) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  PRIMARY KEY (`establecimientoId`),
  KEY `fk_Establecimiento_country_idx` (`iso31661Code`),
  CONSTRAINT `fk_Establecimiento_country` FOREIGN KEY (`iso31661Code`) REFERENCES `country` (`iso31661Code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `establecimiento`
--

LOCK TABLES `establecimiento` WRITE;
/*!40000 ALTER TABLE `establecimiento` DISABLE KEYS */;
INSERT INTO `establecimiento` VALUES (1,'La Quena Plaza de Armas','La Quena Ltda.','contacto@laquena.cl','Juan Perez Perez','CL','Agustinas 1202','Region Metropolitana, RM','Santiago',-33.4410270,-70.6534600,5.00,1,NULL),(2,'Cascanueces','Music Store Spa.','contacto@musicstore.es','Paco Molina','ES','Calle de Granada 57','Madrid','Madrid',40.4028570,-3.6745710,4.51,10,NULL);
/*!40000 ALTER TABLE `establecimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `establecimiento_currency`
--

DROP TABLE IF EXISTS `establecimiento_currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `establecimiento_currency` (
  `establecimientoId` int(11) NOT NULL,
  `currencyId` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`establecimientoId`,`currencyId`),
  KEY `fk_Establecimiento_has_Currency_Currency1_idx` (`currencyId`),
  KEY `fk_Establecimiento_has_Currency_Establecimiento1_idx` (`establecimientoId`),
  CONSTRAINT `fk_Establecimiento_has_Currency_Currency1` FOREIGN KEY (`currencyId`) REFERENCES `currency` (`currencyId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Establecimiento_has_Currency_Establecimiento1` FOREIGN KEY (`establecimientoId`) REFERENCES `establecimiento` (`establecimientoId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `establecimiento_currency`
--

LOCK TABLES `establecimiento_currency` WRITE;
/*!40000 ALTER TABLE `establecimiento_currency` DISABLE KEYS */;
INSERT INTO `establecimiento_currency` VALUES (1,'CLP'),(1,'USD'),(2,'EUR'),(2,'USD');
/*!40000 ALTER TABLE `establecimiento_currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `establecimiento_payMethod`
--

DROP TABLE IF EXISTS `establecimiento_payMethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `establecimiento_payMethod` (
  `establecimientoId` int(11) NOT NULL,
  `payMethodId` int(11) NOT NULL,
  PRIMARY KEY (`establecimientoId`,`payMethodId`),
  KEY `fk_establecimiento_has_PayMehtod_PayMehtod1_idx` (`payMethodId`),
  KEY `fk_establecimiento_has_PayMehtod_establecimiento1_idx` (`establecimientoId`),
  CONSTRAINT `fk_establecimiento_has_PayMehtod_establecimiento1` FOREIGN KEY (`establecimientoId`) REFERENCES `establecimiento` (`establecimientoId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `establecimiento_payMethod`
--

LOCK TABLES `establecimiento_payMethod` WRITE;
/*!40000 ALTER TABLE `establecimiento_payMethod` DISABLE KEYS */;
INSERT INTO `establecimiento_payMethod` VALUES (1,1),(2,1),(1,2),(2,3);
/*!40000 ALTER TABLE `establecimiento_payMethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `openingHour`
--

DROP TABLE IF EXISTS `openingHour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `openingHour` (
  `openingHourId` int(11) NOT NULL AUTO_INCREMENT,
  `establecimientoId` int(11) NOT NULL,
  `description` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`openingHourId`),
  KEY `fk_OpeningHour_Establecimiento1_idx` (`establecimientoId`),
  KEY `idx_openingHour_establecimientoId_description` (`establecimientoId`,`description`),
  CONSTRAINT `fk_OpeningHour_Establecimiento1` FOREIGN KEY (`establecimientoId`) REFERENCES `establecimiento` (`establecimientoId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `openingHour`
--

LOCK TABLES `openingHour` WRITE;
/*!40000 ALTER TABLE `openingHour` DISABLE KEYS */;
INSERT INTO `openingHour` VALUES (2,1,'Do 10:00-17:00'),(1,1,'Lu-Sa 09:00-20:00'),(3,2,'Lu-Sa 10:00-21:00');
/*!40000 ALTER TABLE `openingHour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payMethod`
--

DROP TABLE IF EXISTS `payMethod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payMethod` (
  `payMethodId` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`payMethodId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payMethod`
--

LOCK TABLES `payMethod` WRITE;
/*!40000 ALTER TABLE `payMethod` DISABLE KEYS */;
INSERT INTO `payMethod` VALUES (1,'Efectivo'),(2,'RedCompra'),(3,'EuroCard');
/*!40000 ALTER TABLE `payMethod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phoneList`
--

DROP TABLE IF EXISTS `phoneList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phoneList` (
  `establecimientoId` int(11) NOT NULL,
  `phone` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  UNIQUE KEY `phone_UNIQUE` (`phone`),
  UNIQUE KEY `establecimientoId_UNIQUE` (`establecimientoId`),
  KEY `fk_PhoneList_Establecimiento1_idx` (`establecimientoId`),
  CONSTRAINT `fk_PhoneList_Establecimiento1` FOREIGN KEY (`establecimientoId`) REFERENCES `establecimiento` (`establecimientoId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phoneList`
--

LOCK TABLES `phoneList` WRITE;
/*!40000 ALTER TABLE `phoneList` DISABLE KEYS */;
INSERT INTO `phoneList` VALUES (1,'+56974589487'),(2,'+3212345784');
/*!40000 ALTER TABLE `phoneList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price` (
  `productId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `price` decimal(8,2) DEFAULT NULL,
  `idCurrency` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`productId`,`idCurrency`),
  KEY `fk_price_currency1_idx` (`idCurrency`),
  CONSTRAINT `fk_price_currency1` FOREIGN KEY (`idCurrency`) REFERENCES `currency` (`currencyId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_price_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `productId` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `iso31661Code` varchar(2) COLLATE utf8_spanish_ci NOT NULL,
  `latitude` decimal(11,7) DEFAULT NULL,
  `longitude` decimal(11,7) DEFAULT NULL,
  `history` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `height` decimal(6,2) DEFAULT NULL,
  `height_unitId` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  `weight` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `weight_unitId` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `fk_product_country1_idx` (`iso31661Code`),
  KEY `fk_product_unit1_idx` (`height_unitId`),
  KEY `fk_product_unit2_idx` (`weight_unitId`),
  CONSTRAINT `fk_product_country1` FOREIGN KEY (`iso31661Code`) REFERENCES `country` (`iso31661Code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_unit1` FOREIGN KEY (`height_unitId`) REFERENCES `unit` (`unitId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_unit2` FOREIGN KEY (`weight_unitId`) REFERENCES `unit` (`unitId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_clasification`
--

DROP TABLE IF EXISTS `product_clasification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_clasification` (
  `productId` int(11) NOT NULL,
  `clasificationId` int(11) NOT NULL,
  PRIMARY KEY (`productId`,`clasificationId`),
  KEY `fk_product_has_clasification_clasification1_idx` (`clasificationId`),
  KEY `fk_product_has_clasification_product1_idx` (`productId`),
  CONSTRAINT `fk_product_has_clasification_clasification1` FOREIGN KEY (`clasificationId`) REFERENCES `clasification` (`clasificationId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_clasification_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_clasification`
--

LOCK TABLES `product_clasification` WRITE;
/*!40000 ALTER TABLE `product_clasification` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_clasification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `establecimientoId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`establecimientoId`,`productId`),
  KEY `fk_establecimiento_has_product_product1_idx` (`productId`),
  KEY `fk_establecimiento_has_product_establecimiento1_idx` (`establecimientoId`),
  CONSTRAINT `fk_establecimiento_has_product_establecimiento1` FOREIGN KEY (`establecimientoId`) REFERENCES `establecimiento` (`establecimientoId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_establecimiento_has_product_product1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unit` (
  `unitId` varchar(3) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`unitId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-05 23:25:30
