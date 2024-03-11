import express from "express";

//IMPORT ALL THE FUNCTIONS FROM SERVICES
import {
    getActivityFromId,
    getAllActivities,
} from "../services/activity_services.js";

const activityRouter = express.Router();

//API GET ALL ACTIVITIES (Manage all activities page)
activityRouter.get("/all", async (req, res) => {
    const activities = await getAllActivities();
    if (activities.rowCount > 0) {
        res.status(200).json({
            success: true,
            message: "activities found successfully!",
            activities: activities.rows,
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Activity cannot be found",
        });
    }
});

//API GET AN ACTIVITY FROM AN ACTIVITY ID (activity detail page)
activityRouter.get("/:id", async (req, res) => {
    const activity = await getActivityFromId(req.params.id);
    if (activity.rowCount > 0) {
        res.status(200).json({
            success: true,
            message: "activity found successfully!",
            activity: activity.rows,
        });
    } else {
        res.status(200).json({
            success: false,
            message: "Activity cannot be found",
        });
    }
});

//NEW API HERE

export default activityRouter;
