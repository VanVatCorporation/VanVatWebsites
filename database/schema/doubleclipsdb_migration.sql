-- DoubleClips Database Migration
-- Adds support for view/use tracking, multimedia comments, and nested replies
-- Run this after the initial doubleclipsdb.sql schema

USE `doubleclipsdb`;

-- Add missing stat columns to templates table
ALTER TABLE `templates` 
ADD COLUMN IF NOT EXISTS `viewCount` INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS `useCount` INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS `commentCount` INT DEFAULT 0;

-- Create comments table with multimedia support and nested replies
CREATE TABLE IF NOT EXISTS `template_comments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `commentId` VARCHAR(50) NOT NULL UNIQUE,
  `templateId` VARCHAR(50) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `commentText` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `likeCount` INT DEFAULT 0,
  `replyToCommentId` VARCHAR(50) DEFAULT NULL,
  INDEX `idx_template` (`templateId`),
  INDEX `idx_user` (`username`),
  INDEX `idx_created` (`created_at` DESC),
  INDEX `idx_reply` (`replyToCommentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create comment media table for images, videos, and audio attachments
CREATE TABLE IF NOT EXISTS `comment_media` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `commentId` VARCHAR(50) NOT NULL,
  `mediaType` ENUM('image', 'video', 'audio') NOT NULL,
  `mediaFilename` VARCHAR(255) NOT NULL,
  `mediaSize` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_comment` (`commentId`),
  FOREIGN KEY (`commentId`) REFERENCES `template_comments`(`commentId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create comment likes table
CREATE TABLE IF NOT EXISTS `comment_likes` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `commentId` VARCHAR(50) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_comment_like` (`username`, `commentId`),
  INDEX `idx_comment` (`commentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
