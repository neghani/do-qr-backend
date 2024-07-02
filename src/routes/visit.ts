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
router.post("/", authenticateToken, authorizeRole(["user"]), createVisit);
router.get("/", authenticateToken, authorizeRole(["user"]), getVisits);
router.get("/:id", authenticateToken, authorizeRole(["user"]), getVisitById);
router.put("/:id", authenticateToken, authorizeRole(["user"]), updateVisit);
router.delete("/:id", authenticateToken, authorizeRole(["user"]), deleteVisit);

export default router;
