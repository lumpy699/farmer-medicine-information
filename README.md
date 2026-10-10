# Farmer Medicine Information System – Smart Agriculture Management Platform
> **शेतकरी औषध माहिती प्रणाली / किसान औषधि सूचना प्रणाली**
> *Final Year Engineering Project & Smart Agriculture Solution*

## 1. Project Overview
The **Farmer Medicine Information System** is an end-to-end full-stack agricultural management platform designed to help farmers:
- Identify common crop diseases, viral infections, and insect pests.
- Access verified crop-specific chemical pesticides, fungicides, and organic biological remedies.
- Calculate exact spray dosages for 15-litre backpack manual/battery pumps and 200-litre field drums.
- Review safety instructions, Pre-Harvest Intervals (PHI), and CIBRC toxicity color codes (Green, Blue, Yellow, Red).
- Monitor real-time meteorological conditions and spray suitability advisory (Wind speed & precipitation warnings).
- Experience seamless multilingual accessibility in **Marathi (मराठी - Default)**, **Hindi (हिंदी)**, and **English**.

---

## 2. Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend Architecture**: Java 17, Spring Boot 3.3.x, Spring Data JPA, Spring Security, JWT.
- **Database**: MySQL 8.0 (10 normalized relational tables with indexes and foreign keys).
- **External Integration**: Open-Meteo Weather API for live agricultural meteorology.
- **AI Diagnostics**: Google Gemini API integration for intelligent crop leaf lesion analysis.

---

## 3. Database Schema (MySQL)
The database `farmer_medicine_db` consists of 10 normalized tables defined in `/database/schema.sql`:
1. `users`: Authentication, bcrypt password hashing, and user roles (`ROLE_FARMER`, `ROLE_ADMIN`).
2. `farmer_profiles`: Farmland acres, village, district, state, preferred language.
3. `crops`: Crop agronomy, soil requirements, pH, duration, irrigation, NPK schedules.
4. `crop_diseases`: Pathogen and insect pest records linked to crops.
5. `disease_symptoms`: Normalized symptoms with multilingual labels and affected plant parts.
6. `medicines`: CIBRC approved active technical formulations, commercial brands, dosages, PHI, toxicity labels.
7. `treatments`: Treatment workflows (Chemical, Organic, Biological, Preventive).
8. `treatment_medicines`: Many-to-many association between treatments and medicines.
9. `farmer_crop_selections`: Farmer's selected farm crops and cultivation stages.
10. `search_history`: Search queries and diagnostic audit trail.

---

## 4. Test Accounts & Credentials
The platform includes built-in test accounts for both roles:

### Farmer Account (शेतकरी खाते):
- **Mobile / Email**: `9822334455` or `patil.farmer@agrimail.com`
- **Password**: `Farmer@123`
- **Name**: सदाशिवराव पाटील (Sadashivrao Patil)
- **Role**: Farmer (5.5 Acres in Niphad, Nashik)

### Admin / Agri Officer Account (प्रशासक / कृषी अधिकारी):
- **Mobile / Email**: `9422001122` or `admin@farmerinfo.gov.in`
- **Password**: `Admin@123`
- **Name**: डॉ. विलासराव देशमुख (Dr. V. Deshmukh)
- **Role**: Administrator (Full CRUD permissions for crops, diseases, and medicines)

---

## 5. Execution Instructions

### Running the Web Platform (Interactive Applet):
```bash
# Development server (Port 3000)
npm run dev

# Production build test
npm run build
```

### Running Spring Boot Backend (For Java environment):
```bash
# 1. Initialize MySQL schema
mysql -u root -p < database/schema.sql

# 2. Run Spring Boot application
cd spring-boot-backend
mvn clean spring-boot:run
# Server starts at http://localhost:8080/api/v1
```
