import pg from "pg";
import "dotenv/config";

//CREATION OF DATABASE CLIENT
const db = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
});

//CREATION OF DATABASE CLIENT CREATING DATABASE
const db1 = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
});

//CREATION OF NEW DATABASE CLIENT FOR CREATING TABLE
const db2 = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
});

//CREATION OF NEW DATABASE CLIENT FOR GETTING DATA
const db3 = new pg.Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
});

async function connect() {
  try {
    await db.connect();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    throw error;
  }
}

async function disconnect() {
  try {
    await db.end();
    console.log("Disconnected from PostgreSQL database");
  } catch (error) {
    throw error;
  }
}

async function checkDatabaseExists() {
  try {
    await db.connect();
    const result = await db.query(
      `SELECT 1 FROM pg_database WHERE datname = '${db.database}';`
    );
    return result.rows.length > 0;
  } catch (error) {
    return false;
  }
}

async function createDatabase() {
  try {
    db1.connect();
    await db1.query(`CREATE DATABASE ${db.database};`);
    console.log(`Database '${db.database}' created successfully`);
    db1.end();
  } catch (error) {
    throw error;
  }
}

export {
  db,
  db1,
  db2,
  db3,
  connect,
  disconnect,
  checkDatabaseExists,
  createDatabase,
};
