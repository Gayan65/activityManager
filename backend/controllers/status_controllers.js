import express from "express";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import { getAllActiveStatus } from "../services/status_services.js";

const statusRouter = express.Router();

//API GET ALL STATUS (status update in task update interface)
statusRouter.get("/active", async (req, res) => {
  const activeStatus = await getAllActiveStatus();
  if (activeStatus.rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "all active status found successfully!",
      status: activeStatus.rows,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "status cannot be found",
    });
  }
});

export default statusRouter;
