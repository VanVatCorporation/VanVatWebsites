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


-- Dumping database structure for bookdb
CREATE DATABASE IF NOT EXISTS `bookdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bookdb`;

-- Dumping structure for table bookdb.bookchapters
CREATE TABLE IF NOT EXISTS `bookchapters` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `chapterId` int DEFAULT NULL,
  `chapterName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `chapterDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `chapterUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci,
  `chapterPages` int DEFAULT NULL,
  `chapterSize` int DEFAULT NULL,
  `chapterPriceVND` int NOT NULL DEFAULT '1000',
  KEY `FK_bookchapters_booksdata` (`bookId`) USING BTREE,
  CONSTRAINT `FK_bookchapters_booksdata` FOREIGN KEY (`bookId`) REFERENCES `booksdata` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table bookdb.booksdata
CREATE TABLE IF NOT EXISTS `booksdata` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `bookTitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookAuthor` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookPublisher` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookDate` bigint NOT NULL DEFAULT '0',
  `bookUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookAgeRestriction` int NOT NULL,
  PRIMARY KEY (`bookId`) USING BTREE,
  UNIQUE KEY `BookID` (`bookId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table bookdb.translationbook_en
CREATE TABLE IF NOT EXISTS `translationbook_en` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `bookTitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  KEY `FK_translationbook_en_booksdata` (`bookId`) USING BTREE,
  CONSTRAINT `FK_translationbook_en_booksdata` FOREIGN KEY (`bookId`) REFERENCES `booksdata` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

-- Dumping structure for table bookdb.translationbook_vi
CREATE TABLE IF NOT EXISTS `translationbook_vi` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `bookTitle` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `bookDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci NOT NULL,
  KEY `FK_translationbook_vi_booksdata` (`bookId`) USING BTREE,
  CONSTRAINT `FK_translationbook_vi_booksdata` FOREIGN KEY (`bookId`) REFERENCES `booksdata` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
