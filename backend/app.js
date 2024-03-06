import express from "express";
import "dotenv/config";
import db from "./db/db.js";

const app = express();

//GET ENVS
const port = process.env.PORT;

//BACKEND SEVER AND DATABASE CONNECTION
await db.connect().then(() => {
    console.log("DB connected successfully !....");
    app.listen(port, () => {
        console.log(`Server is running port number ${port}`);
    });
});
