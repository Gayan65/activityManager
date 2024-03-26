import express from "express";
import "dotenv/config";
import cors from "cors";
import { db3 } from "./db/db.js";
import { checkDatabaseExists, createDatabase } from "./db/db.js";
import { createSchemaAndTables } from "./schemas/schemas.js";
import taskRouter from "./controllers/task_controllers.js";
import activityRouter from "./controllers/activity_controllers.js";
import statusRouter from "./controllers/status_controllers.js";
import activityTypeRouter from "./controllers/activity_type_controllers.js";
import notificationRouter from "./controllers/notification_controllers.js";
import { spawn } from "child_process";

const app = express();

//GET ENVS
const port = process.env.PORT;

//API ROUTES MIDDLEWARES
app.use(cors());
app.use("/task", taskRouter);
app.use("/activity", activityRouter);
app.use("/status", statusRouter);
app.use("/activitytype", activityTypeRouter);
app.use("/notification", notificationRouter);

function restartApp() {
  console.log("Restarting the application...");
  const nodemon = spawn("nodemon");
  nodemon.stdin.write("rs\n"); // Send the "rs" command to the input stream
  nodemon.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });
  nodemon.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  nodemon.on("close", (code) => {
    console.log(`nodemon process exited with code ${code}`);
  });
}

//BACKEND SEVER AND DATABASE CONNECTION

async function main() {
  try {
    const databaseExists = await checkDatabaseExists();
    console.log(databaseExists);
    if (!databaseExists) {
      await createDatabase();
      await createSchemaAndTables();
      setTimeout(restartApp, 5000);
    } else {
      console.log("DB connected successfully !....");
      app.listen(port, () => {
        console.log(`Server is running port number ${port}`);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
