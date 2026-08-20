CREATE DATABASE IF NOT EXISTS land_litigation_db;
USE land_litigation_db;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('CITIZEN', 'CLERK', 'ADMIN') NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Land Records Table
CREATE TABLE land_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    survey_number VARCHAR(50) UNIQUE NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    property_type VARCHAR(50),
    area DECIMAL(10, 2),
    location VARCHAR(255),
    registration_number VARCHAR(100),
    registration_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Case Records Table (Litigation)
CREATE TABLE case_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id VARCHAR(50) UNIQUE NOT NULL,
    survey_number VARCHAR(50) NOT NULL,
    case_type VARCHAR(100),
    court_name VARCHAR(100),
    filing_date DATE,
    status VARCHAR(50),
    next_hearing_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (survey_number) REFERENCES land_records(survey_number) ON DELETE CASCADE
);

-- Case History Table
CREATE TABLE case_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    case_id VARCHAR(50) NOT NULL,
    hearing_date DATE,
    event_description TEXT,
    status VARCHAR(50),
    updated_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES case_records(case_id) ON DELETE CASCADE
);

-- Blockchain Blocks Table (Audit Trail)
CREATE TABLE blockchain_blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    block_index INT NOT NULL,
    timestamp VARCHAR(100) NOT NULL,
    transaction_data TEXT NOT NULL,
    previous_hash VARCHAR(64) NOT NULL,
    hash VARCHAR(64) NOT NULL
);
