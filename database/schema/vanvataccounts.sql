-- --------------------------------------------------------
-- Host:                         192.168.1.201
-- Server version:               9.3.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.14.1.1
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for vanvataccounts
CREATE DATABASE IF NOT EXISTS `vanvataccounts` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vanvataccounts`;

-- Dumping structure for table vanvataccounts.bandwidth_usage
CREATE TABLE IF NOT EXISTS `bandwidth_usage` (
  `ip` varchar(45) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `hostname` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `bandwidthByteSent` bigint DEFAULT '0',
  `bandwidthByteReceive` bigint DEFAULT '0',
  PRIMARY KEY (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table vanvataccounts.const_users_tierlist
CREATE TABLE IF NOT EXISTS `const_users_tierlist` (
  `tierID` int NOT NULL,
  `tierName` text COLLATE utf8mb4_vietnamese_ci,
  `trafficLimit` bigint DEFAULT NULL,
  PRIMARY KEY (`tierID`),
  UNIQUE KEY `tierID` (`tierID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table vanvataccounts.users
CREATE TABLE IF NOT EXISTS `users` (
  `accountUUID` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `accountUsername` text COLLATE utf8mb4_vietnamese_ci,
  `accountPassword` text COLLATE utf8mb4_vietnamese_ci,
  `accountEmail` text COLLATE utf8mb4_vietnamese_ci,
  `legalBirthday` date DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `countryCode` text COLLATE utf8mb4_vietnamese_ci,
  `nationalID` text COLLATE utf8mb4_vietnamese_ci,
  `globalTierID` int DEFAULT NULL,
  `firstName` tinytext COLLATE utf8mb4_vietnamese_ci,
  `lastName` tinytext COLLATE utf8mb4_vietnamese_ci,
  `reputationScore` float DEFAULT NULL,
  `bio` text COLLATE utf8mb4_vietnamese_ci,
  `avatarUrl` varchar(500) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT (now()),
  `updatedAt` datetime DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountUUID`),
  UNIQUE KEY `accountUUID` (`accountUUID`),
  KEY `FK_users_const_users_tierlist` (`globalTierID`),
  CONSTRAINT `FK_users_const_users_tierlist` FOREIGN KEY (`globalTierID`) REFERENCES `const_users_tierlist` (`tierID`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table vanvataccounts.users_book
CREATE TABLE IF NOT EXISTS `users_book` (
  `accountUUID` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `accountData` json DEFAULT NULL,
  `boughtAssets` json DEFAULT NULL,
  `accountStatistics` json DEFAULT NULL,
  `streakDate` json DEFAULT NULL,
  UNIQUE KEY `accountUUID` (`accountUUID`),
  CONSTRAINT `FK_users_book_users` FOREIGN KEY (`accountUUID`) REFERENCES `users` (`accountUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table vanvataccounts.users_doubleclips
CREATE TABLE IF NOT EXISTS `users_doubleclips` (
  `accountUUID` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `accountData` json DEFAULT NULL,
  `boughtAssets` json DEFAULT NULL,
  `accountStatistics` json DEFAULT NULL,
  `accountTemplates` json DEFAULT NULL,
  UNIQUE KEY `accountUUID` (`accountUUID`),
  CONSTRAINT `FK_users_doubleclips_users` FOREIGN KEY (`accountUUID`) REFERENCES `users` (`accountUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping structure for table vanvataccounts.users_soprise
CREATE TABLE IF NOT EXISTS `users_soprise` (
  `accountUUID` char(36) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `accountData` json DEFAULT NULL,
  `cart` json DEFAULT NULL,
  `wishlist` json DEFAULT NULL,
  `orderHistory` json DEFAULT NULL,
  UNIQUE KEY `accountUUID` (`accountUUID`),
  CONSTRAINT `FK_users_soprise_users` FOREIGN KEY (`accountUUID`) REFERENCES `users` (`accountUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
