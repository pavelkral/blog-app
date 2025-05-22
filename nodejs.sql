-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.20-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table devlog.m_scms_albums
CREATE TABLE IF NOT EXISTS `m_scms_albums` (
  `alb_id` int(11) NOT NULL AUTO_INCREMENT,
  `alb_name` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `alb_title` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `alb_description` text COLLATE utf8_czech_ci DEFAULT NULL,
  `alb_keywords` text COLLATE utf8_czech_ci DEFAULT NULL,
  `alb_date` date DEFAULT NULL,
  `alb_pic_count` int(11) DEFAULT NULL,
  `alb_user_id` int(11) DEFAULT NULL,
  `alb_art_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`alb_id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.m_scms_pictures
CREATE TABLE IF NOT EXISTS `m_scms_pictures` (
  `pic_id` int(11) NOT NULL AUTO_INCREMENT,
  `pic_alb_id` int(11) DEFAULT NULL,
  `pic_name` text COLLATE utf8_czech_ci DEFAULT NULL,
  `pic_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `pic_comments` text COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`pic_id`),
  KEY `pic_alb_id` (`pic_alb_id`)
) ENGINE=MyISAM AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_articles
CREATE TABLE IF NOT EXISTS `scms_articles` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `art_sc_id` int(11) DEFAULT NULL,
  `art_sc_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `art_subsc_id` int(11) DEFAULT NULL,
  `art_subsc_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `art_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `art_name` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `art_title` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `art_description` text COLLATE utf8_czech_ci DEFAULT NULL,
  `art_keywords` text COLLATE utf8_czech_ci DEFAULT NULL,
  `art_imgurl` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `art_string` text COLLATE utf8_czech_ci DEFAULT NULL,
  `art_date` date DEFAULT NULL,
  `art_time` time DEFAULT NULL,
  `art_views` int(11) DEFAULT NULL,
  `art_com_count` int(11) DEFAULT NULL,
  `art_header` text COLLATE utf8_czech_ci DEFAULT NULL,
  `art_alb` int(11) NOT NULL,
  `art_approved` int(11) DEFAULT NULL,
  `art_private` tinyint(1) DEFAULT NULL,
  `art_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`art_id`),
  KEY `art_sc_id` (`art_sc_id`),
  KEY `art_subsc_id` (`art_subsc_id`),
  KEY `art_url` (`art_url`),
  KEY `art_private` (`art_private`),
  KEY `art_sc_url` (`art_sc_url`),
  KEY `art_approved` (`art_approved`),
  KEY `art_subsc_url` (`art_subsc_url`),
  KEY `art_user_id` (`art_user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=761 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_articles_com
CREATE TABLE IF NOT EXISTS `scms_articles_com` (
  `com_id` int(11) NOT NULL AUTO_INCREMENT,
  `com_user_id` int(11) DEFAULT NULL,
  `com_art_id` int(11) DEFAULT NULL,
  `com_string` text COLLATE utf8_czech_ci DEFAULT NULL,
  `com_date` date DEFAULT NULL,
  `com_time` time DEFAULT NULL,
  `com_position` int(11) DEFAULT NULL,
  `com_re` int(11) DEFAULT NULL,
  `com_depth` int(11) DEFAULT NULL,
  PRIMARY KEY (`com_id`),
  KEY `com_art_id` (`com_art_id`)
) ENGINE=MyISAM AUTO_INCREMENT=418 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_media
CREATE TABLE IF NOT EXISTS `scms_media` (
  `md_id` int(11) NOT NULL AUTO_INCREMENT,
  `md_text` text COLLATE utf8_czech_ci NOT NULL,
  `md_name` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `md_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `md_size` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `md_date` date DEFAULT NULL,
  `md_time` time DEFAULT NULL,
  `md_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`md_id`),
  KEY `md_user_id` (`md_user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_projects
CREATE TABLE IF NOT EXISTS `scms_projects` (
  `pro_id` int(11) NOT NULL AUTO_INCREMENT,
  `pro_leader_id` int(11) DEFAULT NULL,
  `pro_name` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `pro_type_id` int(11) DEFAULT NULL,
  `pro_url` varchar(1024) CHARACTER SET utf8 DEFAULT NULL,
  `pro_desc` text CHARACTER SET utf8 DEFAULT NULL,
  `pro_datestart` date DEFAULT NULL,
  `pro_complete` tinyint(1) DEFAULT NULL,
  `pro_year` int(11) DEFAULT NULL,
  `pro_giturl` varchar(1024) CHARACTER SET utf8 DEFAULT NULL,
  `pro_imgurl` varchar(1024) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`pro_id`),
  KEY `pro_leader_id` (`pro_leader_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_section
CREATE TABLE IF NOT EXISTS `scms_section` (
  `sc_id` int(11) NOT NULL AUTO_INCREMENT,
  `sc_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `sc_title` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `sc_description` text COLLATE utf8_czech_ci DEFAULT NULL,
  `sc_keywords` text COLLATE utf8_czech_ci DEFAULT NULL,
  `sc_menu_poz` int(11) DEFAULT NULL,
  `sc_name` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `sc_type` varchar(10) COLLATE utf8_czech_ci DEFAULT NULL,
  `sc_public` tinyint(1) DEFAULT NULL,
  `sc_art_count` int(11) DEFAULT NULL,
  `sc_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`sc_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_settings
CREATE TABLE IF NOT EXISTS `scms_settings` (
  `web_id` int(11) NOT NULL,
  `web_domain` varchar(60) COLLATE utf8_czech_ci DEFAULT NULL,
  `web_name` varchar(60) COLLATE utf8_czech_ci DEFAULT NULL,
  `web_title` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `web_keywords` text COLLATE utf8_czech_ci DEFAULT NULL,
  `web_topmovie` text COLLATE utf8_czech_ci DEFAULT NULL,
  `web_dec` text COLLATE utf8_czech_ci DEFAULT NULL,
  `web_slider_articles` varchar(256) COLLATE utf8_czech_ci DEFAULT NULL,
  `web_topart` int(11) DEFAULT 1,
  PRIMARY KEY (`web_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_sub_section
CREATE TABLE IF NOT EXISTS `scms_sub_section` (
  `subsc_id` int(11) NOT NULL AUTO_INCREMENT,
  `subsc_sc_id` int(11) DEFAULT NULL,
  `subsc_sc_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `subsc_name` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `subsc_url` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `subsc_title` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  `subsc_description` text COLLATE utf8_czech_ci DEFAULT NULL,
  `subsc_keywords` text COLLATE utf8_czech_ci DEFAULT NULL,
  `subsc_art_count` int(11) DEFAULT NULL,
  `subsc_date` date DEFAULT NULL,
  `subsc_time` time DEFAULT NULL,
  `subsc_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`subsc_id`),
  KEY `subsc_sc_id` (`subsc_sc_id`),
  KEY `subsc_sc_url` (`subsc_sc_url`),
  KEY `subsc_url` (`subsc_url`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_users
CREATE TABLE IF NOT EXISTS `scms_users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  `user_name` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  `user_lastname` varchar(256) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

-- Dumping structure for table devlog.scms_visits
CREATE TABLE IF NOT EXISTS `scms_visits` (
  `vis_id` int(11) NOT NULL AUTO_INCREMENT,
  `vis_time` time DEFAULT NULL,
  `vis_date` date DEFAULT NULL,
  `vis_ip` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
  PRIMARY KEY (`vis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
