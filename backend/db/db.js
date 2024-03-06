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

export default db;
