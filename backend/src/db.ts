import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let dbPromise: Promise<any> | null = null;

const getDb = () => {
  if (!dbPromise) {
    const dbPath = path.join(__dirname, '../../db/database.sqlite');
    dbPromise = open({
      filename: dbPath,
      driver: sqlite3.Database
    });
  }
  return dbPromise;
};

// Create a mock pool that exposes query method
const pool = {
  query: async (sql: string, params: any[] = []) => {
    const db = await getDb();
    const isSelect = sql.trim().toLowerCase().startsWith('select');
    
    // SQLite syntax replacements to match mysql2 usage
    const sqliteSql = sql.replace(/\?/g, '?'); 
    
    if (isSelect) {
      const rows = await db.all(sqliteSql, params);
      return [rows]; // Wrap in array to mimic [rows, fields] format of mysql2
    } else {
      const result = await db.run(sqliteSql, params);
      return [result];
    }
  }
};

export default pool;
