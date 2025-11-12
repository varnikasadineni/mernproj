import express from "express";
import { getNearbyEvents } from "../controllers/eventController.js";

const router = express.Router();

router.get("/v1/search", getNearbyEvents);

export default router;
