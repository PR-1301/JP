import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Standard local MySQL configuration
// User should update .env if they have a password set for root
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'land_litigation_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
