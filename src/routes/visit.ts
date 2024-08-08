import express from "express";
import {
  createVisit,
  getVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
} from "../controllers/visitController";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = express.Router();

// Routes for CRUD operations on visits
router.post("/", authenticateToken, createVisit);
router.get("/", authenticateToken,  getVisits);
router.get("/:id", authenticateToken, getVisitById);
router.put("/:id", authenticateToken, updateVisit);
router.delete("/:id", authenticateToken,  deleteVisit);

export default router;
