import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import Usercontroller from "../controllers/usercontroller.js";
// import { getUsersForSidebar } from "../controllers/usercontroller.js";

const router = express.Router();

router.get("/", protectRoute, Usercontroller.getUsersForSidebar);

export default router;