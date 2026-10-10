-- ============================================================================
-- Farmer Medicine Information System – Smart Agriculture Management Platform
-- Database Schema: MySQL 8.0+
-- Final Year Engineering & Research Project Database Design
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `farmer_medicine_db` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `farmer_medicine_db`;

-- Drop existing tables in reverse dependency order
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `search_history`;
DROP TABLE IF EXISTS `farmer_crop_selections`;
DROP TABLE IF EXISTS `weather_records`;
DROP TABLE IF EXISTS `treatment_medicines`;
DROP TABLE IF EXISTS `medicines`;
DROP TABLE IF EXISTS `treatments`;
DROP TABLE IF EXISTS `disease_symptoms`;
DROP TABLE IF EXISTS `crop_diseases`;
DROP TABLE IF EXISTS `crops`;
DROP TABLE IF EXISTS `farmer_profiles`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- Table 1: users (Authentication & Role Based Access Control)
-- ----------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `mobile_number` VARCHAR(15) NOT NULL UNIQUE,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('ROLE_FARMER', 'ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_FARMER',
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_mobile` (`mobile_number`),
  INDEX `idx_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 2: farmer_profiles (Farmer specific agricultural details)
-- ----------------------------------------------------------------------------
CREATE TABLE `farmer_profiles` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL UNIQUE,
  `village` VARCHAR(100) NOT NULL,
  `taluka` VARCHAR(100),
  `district` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
  `land_area_acres` DECIMAL(6,2) DEFAULT 0.00,
  `preferred_language` ENUM('mr', 'hi', 'en') DEFAULT 'mr',
  `soil_type` VARCHAR(80),
  `irrigation_type` VARCHAR(80),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 3: crops (Crop agronomy repository)
-- ----------------------------------------------------------------------------
CREATE TABLE `crops` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `crop_code` VARCHAR(50) NOT NULL UNIQUE,
  `name_mr` VARCHAR(100) NOT NULL,
  `name_hi` VARCHAR(100) NOT NULL,
  `name_en` VARCHAR(100) NOT NULL,
  `botanical_name` VARCHAR(150),
  `category` ENUM('CASH_CROP', 'OILSEED', 'CEREAL', 'VEGETABLE', 'HORTICULTURE', 'PULSE') NOT NULL,
  `suitable_season` ENUM('KHARIF', 'RABI', 'SUMMER', 'ANNUAL') NOT NULL,
  `soil_requirements_mr` TEXT,
  `soil_requirements_hi` TEXT,
  `soil_requirements_en` TEXT,
  `ph_range` VARCHAR(30),
  `duration_days` VARCHAR(50),
  `irrigation_guide_mr` TEXT,
  `irrigation_guide_hi` TEXT,
  `irrigation_guide_en` TEXT,
  `npk_ratio` VARCHAR(50),
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 4: crop_diseases (Pathogen and insect pest records)
-- ----------------------------------------------------------------------------
CREATE TABLE `crop_diseases` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `crop_id` BIGINT NOT NULL,
  `disease_code` VARCHAR(80) NOT NULL UNIQUE,
  `name_mr` VARCHAR(150) NOT NULL,
  `name_hi` VARCHAR(150) NOT NULL,
  `name_en` VARCHAR(150) NOT NULL,
  `category` ENUM('FUNGAL', 'BACTERIAL', 'VIRAL', 'PEST_INSECT', 'DEFICIENCY') NOT NULL,
  `severity` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
  `favorable_conditions_mr` TEXT,
  `favorable_conditions_hi` TEXT,
  `favorable_conditions_en` TEXT,
  `image_url` VARCHAR(500),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`crop_id`) REFERENCES `crops`(`id`) ON DELETE CASCADE,
  INDEX `idx_disease_crop` (`crop_id`),
  INDEX `idx_disease_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 5: disease_symptoms (Normalized symptoms with multilingual labels)
-- ----------------------------------------------------------------------------
CREATE TABLE `disease_symptoms` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `disease_id` BIGINT NOT NULL,
  `symptom_text_mr` VARCHAR(300) NOT NULL,
  `symptom_text_hi` VARCHAR(300) NOT NULL,
  `symptom_text_en` VARCHAR(300) NOT NULL,
  `affected_part` ENUM('LEAF', 'STEM', 'FRUIT_BOLL', 'FLOWER', 'ROOT', 'WHOLE_PLANT') DEFAULT 'LEAF',
  FOREIGN KEY (`disease_id`) REFERENCES `crop_diseases`(`id`) ON DELETE CASCADE,
  INDEX `idx_symptom_disease` (`disease_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 6: medicines (CIBRC approved agricultural pesticides & biopesticides)
-- ----------------------------------------------------------------------------
CREATE TABLE `medicines` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `commercial_name_mr` VARCHAR(150) NOT NULL,
  `commercial_name_hi` VARCHAR(150) NOT NULL,
  `commercial_name_en` VARCHAR(150) NOT NULL,
  `technical_name` VARCHAR(250) NOT NULL,
  `medicine_type` ENUM('CHEMICAL_INSECTICIDE', 'CHEMICAL_FUNGICIDE', 'BIO_PESTICIDE', 'BIO_FUNGICIDE', 'HERBICIDE') NOT NULL,
  `toxicity_category` ENUM('GREEN', 'BLUE', 'YELLOW', 'RED') NOT NULL DEFAULT 'GREEN',
  `dose_per_pump_15l` VARCHAR(80) NOT NULL,
  `dose_per_acre_200l` VARCHAR(80) NOT NULL,
  `pre_harvest_interval_days` INT NOT NULL DEFAULT 7,
  `application_method_mr` TEXT,
  `application_method_hi` TEXT,
  `application_method_en` TEXT,
  `safety_precautions_mr` TEXT,
  `safety_precautions_hi` TEXT,
  `safety_precautions_en` TEXT,
  `approx_pack_cost` VARCHAR(50),
  `is_verified_by_agronomist` BOOLEAN DEFAULT TRUE,
  INDEX `idx_medicine_technical` (`technical_name`),
  INDEX `idx_medicine_toxicity` (`toxicity_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 7: treatments (Recommended verified treatment courses)
-- ----------------------------------------------------------------------------
CREATE TABLE `treatments` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `disease_id` BIGINT NOT NULL,
  `treatment_type` ENUM('CHEMICAL', 'ORGANIC', 'PREVENTIVE', 'BIOLOGICAL') NOT NULL,
  `title_mr` VARCHAR(200) NOT NULL,
  `title_hi` VARCHAR(200) NOT NULL,
  `title_en` VARCHAR(200) NOT NULL,
  `description_mr` TEXT,
  `description_hi` TEXT,
  `description_en` TEXT,
  `effectiveness_percentage` INT DEFAULT 90,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`disease_id`) REFERENCES `crop_diseases`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 8: treatment_medicines (Many-to-Many link between Treatment & Medicine)
-- ----------------------------------------------------------------------------
CREATE TABLE `treatment_medicines` (
  `treatment_id` BIGINT NOT NULL,
  `medicine_id` BIGINT NOT NULL,
  `specific_dosage_notes` VARCHAR(200),
  PRIMARY KEY (`treatment_id`, `medicine_id`),
  FOREIGN KEY (`treatment_id`) REFERENCES `treatments`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`medicine_id`) REFERENCES `medicines`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 9: farmer_crop_selections (Farmer's current farm crops)
-- ----------------------------------------------------------------------------
CREATE TABLE `farmer_crop_selections` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `crop_id` BIGINT NOT NULL,
  `area_acres` DECIMAL(5,2) DEFAULT 1.0,
  `sowing_date` DATE,
  `current_stage` VARCHAR(80),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`crop_id`) REFERENCES `crops`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_farmer_crop` (`user_id`, `crop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table 10: search_history (User query and disease diagnostic log)
-- ----------------------------------------------------------------------------
CREATE TABLE `search_history` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT NOT NULL,
  `query_term` VARCHAR(255) NOT NULL,
  `searched_crop_id` BIGINT,
  `identified_disease_id` BIGINT,
  `confidence_score` DECIMAL(4,2),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`searched_crop_id`) REFERENCES `crops`(`id`) ON DELETE SET NULL,
  FOREIGN KEY (`identified_disease_id`) REFERENCES `crop_diseases`(`id`) ON DELETE SET NULL,
  INDEX `idx_history_user` (`user_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Sample Seeds for MySQL
-- ----------------------------------------------------------------------------
INSERT INTO `users` (`id`, `full_name`, `mobile_number`, `email`, `password_hash`, `role`) VALUES
(1, 'सदाशिवराव पाटील', '9822334455', 'patil.farmer@agrimail.com', '$2a$12$e8Ym...hashedBCryptPass', 'ROLE_FARMER'),
(2, 'डॉ. विलासराव देशमुख', '9422001122', 'admin@farmerinfo.gov.in', '$2a$12$z2Pq...hashedBCryptPass', 'ROLE_ADMIN');

INSERT INTO `farmer_profiles` (`user_id`, `village`, `district`, `land_area_acres`, `preferred_language`) VALUES
(1, 'निफाड', 'Nashik', 5.50, 'mr');

INSERT INTO `crops` (`id`, `crop_code`, `name_mr`, `name_hi`, `name_en`, `category`, `suitable_season`, `npk_ratio`) VALUES
(1, 'crop-cotton', 'कापूस', 'कपास', 'Cotton', 'CASH_CROP', 'KHARIF', '120:60:60'),
(2, 'crop-soybean', 'सोयाबीन', 'सोयाबीन', 'Soybean', 'OILSEED', 'KHARIF', '30:60:30'),
(3, 'crop-onion', 'कांदा', 'प्याज', 'Onion', 'VEGETABLE', 'RABI', '100:50:50'),
(4, 'crop-tomato', 'टोमॅटो', 'टमाटर', 'Tomato', 'VEGETABLE', 'KHARIF', '150:100:100');
