import express from "express";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import { getAllActivityTypes } from "../services/activity_type_services.js";

const activityTypeRouter = express.Router();

//API GET ALL ACTIVITY TYPES (Manage all activityTypes page)
activityTypeRouter.get("/all", async (req, res) => {
  const activityTypes = await getAllActivityTypes();
  if (activityTypes.rowCount > 0) {
    res.status(200).json({
      success: true,
      message: "activityTypes found successfully!",
      activityTypes: activityTypes.rows,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "Activity type cannot be found",
    });
  }
});

export default activityTypeRouter;
