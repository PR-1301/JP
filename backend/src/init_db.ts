import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

(async () => {
  const dbPath = path.join(__dirname, '../../db/database.sqlite');
  console.log('Initializing database at:', dbPath);
  
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL,
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS land_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        survey_number VARCHAR(50) UNIQUE NOT NULL,
        owner_name VARCHAR(100) NOT NULL,
        property_type VARCHAR(50),
        area DECIMAL(10, 2),
        location VARCHAR(255),
        registration_number VARCHAR(100),
        registration_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS case_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id VARCHAR(50) UNIQUE NOT NULL,
        survey_number VARCHAR(50) NOT NULL,
        case_type VARCHAR(100),
        court_name VARCHAR(100),
        filing_date DATE,
        status VARCHAR(50),
        next_hearing_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (survey_number) REFERENCES land_records(survey_number) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS case_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        case_id VARCHAR(50) NOT NULL,
        hearing_date DATE,
        event_description TEXT,
        status VARCHAR(50),
        updated_by VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (case_id) REFERENCES case_records(case_id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS blockchain_blocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        block_index INT NOT NULL,
        timestamp VARCHAR(100) NOT NULL,
        transaction_data TEXT NOT NULL,
        previous_hash VARCHAR(64) NOT NULL,
        hash VARCHAR(64) NOT NULL
    );
  `);

  console.log("Tables created!");

  // Insert mock data
  await db.exec(`
    INSERT OR IGNORE INTO land_records (id, survey_number, owner_name, area, location, registration_date) VALUES 
    (1, 'SVY-1024', 'John Doe', 1.5, 'Plot 12, Greenfield District', '2023-01-15'),
    (2, 'SVY-1025', 'Michael Chang', 0.8, 'Plot 13, Greenfield District', '2022-11-20'),
    (3, 'SVY-2048', 'Sarah Jenkins', 2.0, 'Sector 5, North Ridge', '2021-05-10'),
    (4, 'SVY-2050', 'David Torres', 1.2, 'Sector 6, North Ridge', '2024-02-28');
    
    INSERT OR IGNORE INTO case_records (id, case_id, survey_number, filing_date, status) VALUES
    (1, 'LIT-2023-089', 'SVY-1025', '2023-08-12', 'in_progress'),
    (2, 'LIT-2022-112', 'SVY-2048', '2022-04-05', 'closed');

    INSERT OR IGNORE INTO case_history (id, case_id, hearing_date, event_description, status) VALUES
    (1, 'LIT-2023-089', '2023-09-01', 'Initial Hearing', 'completed'),
    (2, 'LIT-2023-089', '2023-11-15', 'Evidence Submission', 'completed'),
    (3, 'LIT-2023-089', '2024-01-20', 'Witness Testimony', 'adjourned'),
    (4, 'LIT-2023-089', '2024-03-10', 'Final Arguments', 'scheduled'),
    (5, 'LIT-2022-112', '2022-05-10', 'Initial Hearing', 'completed'),
    (6, 'LIT-2022-112', '2022-08-22', 'Verdict Announced', 'completed');

    INSERT OR IGNORE INTO blockchain_blocks (block_index, timestamp, transaction_data, previous_hash, hash) VALUES
    (0, '2023-01-15T08:00:00Z', '{"type": "GENESIS", "info": "Chain Initialized"}', '0000000000000000', '0000x8a9b2c3d'),
    (1, '2023-01-15T09:30:12Z', '{"type": "LAND_REGISTERED", "recordId": "L001", "survey": "SVY-1024"}', '0000x8a9b2c3d', '0000x4f1e9d8c'),
    (2, '2023-08-12T14:20:05Z', '{"type": "CASE_FILED", "caseId": "C001", "survey": "SVY-1025"}', '0000x4f1e9d8c', '0000xb5a4c3d2'),
    (3, '2023-09-01T10:15:30Z', '{"type": "HEARING_UPDATED", "caseId": "C001", "hearingId": "H001", "status": "completed"}', '0000xb5a4c3d2', '0000xe1f2g3h4'),
    (4, '2024-02-28T11:45:00Z', '{"type": "LAND_REGISTERED", "recordId": "L004", "survey": "SVY-2050"}', '0000xe1f2g3h4', '0000xy7z8a9b0');
  `);
  console.log("Mock data inserted!");
})();
