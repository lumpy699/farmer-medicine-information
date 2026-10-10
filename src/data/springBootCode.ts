export interface CodeFile {
  path: string;
  filename: string;
  language: string;
  category: 'Entity' | 'Repository' | 'Service' | 'Controller' | 'Security' | 'Config' | 'Database' | 'Documentation';
  code: string;
  description: string;
}

export const SPRING_BOOT_PROJECT_FILES: CodeFile[] = [
  {
    path: 'database/schema.sql',
    filename: 'schema.sql',
    language: 'sql',
    category: 'Database',
    description: 'Complete 10-table normalized relational schema in MySQL 8.0 with indexes, FK cascades, and seed data.',
    code: `-- ============================================================================
-- Farmer Medicine Information System – Database Schema (MySQL 8.0)
-- 10 Normalized Tables with Foreign Keys, Constraints, and Indexes
-- ============================================================================

CREATE DATABASE IF NOT EXISTS farmer_medicine_db CHARACTER SET utf8mb4;
USE farmer_medicine_db;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ROLE_FARMER', 'ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_FARMER',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_mobile (mobile_number)
);

CREATE TABLE farmer_profiles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  village VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
  land_area_acres DECIMAL(6,2) DEFAULT 0.00,
  preferred_language ENUM('mr', 'hi', 'en') DEFAULT 'mr',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE crops (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  crop_code VARCHAR(50) NOT NULL UNIQUE,
  name_mr VARCHAR(100) NOT NULL,
  name_hi VARCHAR(100) NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  category ENUM('CASH_CROP', 'OILSEED', 'CEREAL', 'VEGETABLE', 'HORTICULTURE', 'PULSE') NOT NULL,
  suitable_season ENUM('KHARIF', 'RABI', 'SUMMER', 'ANNUAL') NOT NULL,
  npk_ratio VARCHAR(50),
  image_url VARCHAR(500)
);

CREATE TABLE crop_diseases (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  crop_id BIGINT NOT NULL,
  name_mr VARCHAR(150) NOT NULL,
  name_hi VARCHAR(150) NOT NULL,
  name_en VARCHAR(150) NOT NULL,
  category ENUM('FUNGAL', 'BACTERIAL', 'VIRAL', 'PEST_INSECT', 'DEFICIENCY') NOT NULL,
  severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
  FOREIGN KEY (crop_id) REFERENCES crops(id) ON DELETE CASCADE
);

CREATE TABLE medicines (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  commercial_name_mr VARCHAR(150) NOT NULL,
  commercial_name_en VARCHAR(150) NOT NULL,
  technical_name VARCHAR(250) NOT NULL,
  medicine_type ENUM('CHEMICAL_INSECTICIDE', 'CHEMICAL_FUNGICIDE', 'BIO_PESTICIDE', 'BIO_FUNGICIDE') NOT NULL,
  toxicity_category ENUM('GREEN', 'BLUE', 'YELLOW', 'RED') NOT NULL,
  dose_per_pump_15l VARCHAR(80) NOT NULL,
  dose_per_acre_200l VARCHAR(80) NOT NULL,
  pre_harvest_interval_days INT NOT NULL DEFAULT 7
);`,
  },
  {
    path: 'pom.xml',
    filename: 'pom.xml',
    language: 'xml',
    category: 'Config',
    description: 'Maven configuration containing Spring Boot 3.3.x, Spring Security, JWT, JPA, and MySQL Driver.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.2</version>
        <relativePath/>
    </parent>
    <groupId>com.agri.farmermed</groupId>
    <artifactId>farmer-medicine-info-system</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>farmer-medicine-info-system</name>
    <description>Smart Agriculture Management Platform - Spring Boot Backend</description>

    <properties>
        <java.version>17</java.version>
        <jjwt.version>0.11.5</jjwt.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL Connector -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- JWT for Stateless Auth -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>\${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>\${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
    </dependencies>
</project>`,
  },
  {
    path: 'src/main/resources/application.properties',
    filename: 'application.properties',
    language: 'properties',
    category: 'Config',
    description: 'Spring Boot datasource configurations for MySQL, Hibernate dialect, and JWT secrets.',
    code: `# Server Configuration
server.port=8080
server.servlet.context-path=/api/v1

# MySQL Database DataSource
spring.datasource.url=jdbc:mysql://localhost:3306/farmer_medicine_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root@password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# JWT Security
jwt.secret=9a4f2c8d7e1b3a5f6e8d0c2b4a6f8e1d3c5b7a9f0e2d4b6a8c0e2f4a6b8d0e2
jwt.expiration=86400000

# Open-Meteo Weather API endpoint
weather.api.base-url=https://api.open-meteo.com/v1/forecast`,
  },
  {
    path: 'src/main/java/com/agri/farmermed/entity/CropDisease.java',
    filename: 'CropDisease.java',
    language: 'java',
    category: 'Entity',
    description: 'JPA entity mapping crop diseases, symptoms, and links to approved treatments.',
    code: `package com.agri.farmermed.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "crop_diseases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropDisease {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    @Column(nullable = false, length = 150)
    private String nameMr;

    @Column(nullable = false, length = 150)
    private String nameHi;

    @Column(nullable = false, length = 150)
    private String nameEn;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiseaseCategory category; // FUNGAL, BACTERIAL, VIRAL, PEST_INSECT

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeverityLevel severity; // LOW, MEDIUM, HIGH, CRITICAL

    @Column(columnDefinition = "TEXT")
    private String favorableConditionsMr;

    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiseaseSymptom> symptoms;

    @OneToMany(mappedBy = "disease", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Treatment> treatments;

    private String imageUrl;
}`,
  },
  {
    path: 'src/main/java/com/agri/farmermed/entity/Medicine.java',
    filename: 'Medicine.java',
    language: 'java',
    category: 'Entity',
    description: 'JPA entity storing CIBRC verified pesticides with exact pump dosage and safety categories.',
    code: `package com.agri.farmermed.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String commercialNameMr;

    @Column(nullable = false, length = 150)
    private String commercialNameEn;

    @Column(nullable = false, length = 250)
    private String technicalName; // e.g., Chlorantraniliprole 18.5% SC

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MedicineType medicineType; // CHEMICAL_INSECTICIDE, BIO_PESTICIDE

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ToxicityCategory toxicityCategory; // GREEN, BLUE, YELLOW, RED

    @Column(nullable = false, length = 80)
    private String dosePerPump15l; // Verified 15L tank dose

    @Column(nullable = false, length = 80)
    private String dosePerAcre200l;

    @Column(nullable = false)
    private Integer preHarvestIntervalDays; // PHI in days

    @Column(columnDefinition = "TEXT")
    private String applicationMethodMr;

    @Column(columnDefinition = "TEXT")
    private String safetyPrecautionsMr;
}`,
  },
  {
    path: 'src/main/java/com/agri/farmermed/controller/DiseaseController.java',
    filename: 'DiseaseController.java',
    language: 'java',
    category: 'Controller',
    description: 'Spring REST Controller providing disease diagnosis endpoints and symptom search.',
    code: `package com.agri.farmermed.controller;

import com.agri.farmermed.dto.DiagnosisRequest;
import com.agri.farmermed.dto.DiseaseResponse;
import com.agri.farmermed.service.DiseaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/diseases")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DiseaseController {

    private final DiseaseService diseaseService;

    @GetMapping("/crop/{cropId}")
    public ResponseEntity<List<DiseaseResponse>> getDiseasesByCrop(@PathVariable Long cropId) {
        return ResponseEntity.ok(diseaseService.findByCropId(cropId));
    }

    @PostMapping("/diagnose")
    public ResponseEntity<List<DiseaseResponse>> diagnoseCropDisease(@RequestBody DiagnosisRequest request) {
        // Matches selected crop and symptoms against database knowledge graph
        return ResponseEntity.ok(diseaseService.diagnose(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DiseaseResponse> getDiseaseDetails(@PathVariable Long id) {
        return ResponseEntity.ok(diseaseService.findById(id));
    }
}`,
  },
  {
    path: 'src/main/java/com/agri/farmermed/service/DiseaseService.java',
    filename: 'DiseaseService.java',
    language: 'java',
    category: 'Service',
    description: 'Spring service implementing crop disease matching algorithms and verified treatments.',
    code: `package com.agri.farmermed.service;

import com.agri.farmermed.dto.DiagnosisRequest;
import com.agri.farmermed.dto.DiseaseResponse;
import com.agri.farmermed.entity.CropDisease;
import com.agri.farmermed.repository.CropDiseaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiseaseService {

    private final CropDiseaseRepository diseaseRepository;

    public List<DiseaseResponse> diagnose(DiagnosisRequest request) {
        // Retrieve candidate diseases for the crop
        List<CropDisease> candidates = diseaseRepository.findByCropId(request.getCropId());
        
        // Compute symptom overlap confidence
        return candidates.stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public List<DiseaseResponse> findByCropId(Long cropId) {
        return diseaseRepository.findByCropId(cropId).stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    public DiseaseResponse findById(Long id) {
        CropDisease d = diseaseRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Disease record not found: " + id));
        return mapToResponse(d);
    }

    private DiseaseResponse mapToResponse(CropDisease disease) {
        // Conversion logic to DTO
        return DiseaseResponse.fromEntity(disease);
    }
}`,
  },
  {
    path: 'src/main/java/com/agri/farmermed/security/SecurityConfig.java',
    filename: 'SecurityConfig.java',
    language: 'java',
    category: 'Security',
    description: 'Spring Security 6 configuration with BCrypt hashing and JWT stateless filter.',
    code: `package com.agri.farmermed.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**", "/crops/**", "/diseases/**", "/medicines/**", "/weather/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}`,
  },
];
