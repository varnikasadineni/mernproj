import express from "express";
import { getNearbyEvents } from "../controllers/eventController.js";

const router = express.Router();

router.get("/search", getNearbyEvents);

export default router;
