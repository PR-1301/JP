USE land_litigation_db;

-- Insert Users (Password is 'password' hashed with SHA-256: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8)
INSERT INTO users (username, password_hash, role) VALUES 
('admin1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'ADMIN'),
('clerk1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'CLERK'),
('clerk2', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'CLERK'),
('citizen1', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'CITIZEN'),
('citizen2', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'CITIZEN');

-- Insert Land Records
INSERT INTO land_records (survey_number, owner_name, property_type, area, location, registration_number, registration_date) VALUES 
('124/2A', 'Ravi Kumar', 'Residential', 2400.00, 'North Bangalore', 'REG-1001', '2015-06-12'),
('124/2B', 'Anita Sharma', 'Commercial', 5000.00, 'North Bangalore', 'REG-1002', '2016-08-21'),
('130/1', 'Rajesh Patil', 'Agricultural', 43560.00, 'Pune Outskirts', 'REG-1003', '2010-01-15');

-- Insert Litigation Cases
INSERT INTO case_records (case_id, survey_number, case_type, court_name, filing_date, status, next_hearing_date) VALUES 
('C102', '124/2A', 'Property Boundary Dispute', 'District Civil Court', '2025-05-10', 'Pending', '2026-08-25'),
('C103', '130/1', 'Inheritance Claim', 'High Court', '2024-11-01', 'Active', '2026-09-10');

-- Insert Case History
INSERT INTO case_history (case_id, hearing_date, event_description, status, updated_by) VALUES 
('C102', '2025-06-15', 'Initial filing reviewed. Summons issued to opposite party.', 'Pending', 'clerk1'),
('C102', '2025-09-20', 'Opposite party requested extension.', 'Pending', 'clerk1'),
('C103', '2024-12-10', 'Evidence submitted by plaintiff.', 'Active', 'clerk2');

-- Note: The blockchain ledger starts empty. When you start the app, it will create the GENESIS block.
-- From then on, any changes made via the Clerk Dashboard will generate blocks automatically.
