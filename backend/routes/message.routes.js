import express from "express";
import MessageController from "../controllers/messagecontroller.js";  // Adjusted import to use the MessageController class
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Use the static methods of MessageController directly
router.get("/:id", protectRoute, MessageController.getMessages); //protectRoute is the middle ware that make suser the user is logged in and gives the user attribute to the request so the ud can be extracted if they are logged in
router.post("/send/:id", protectRoute, MessageController.sendMessage);

export default router;
