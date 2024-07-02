import { Router } from "express";
import {
  UnitController,
  addOccupant,
  removeOccupant,
} from "../controllers/unit";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = Router();
const controller = new UnitController();

// CRUD operations for units with token authentication
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.getAllUnits
);
router.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.createUnit
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.getUnitById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.updateUnit
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.deleteUnit
);

router.post(
  "/:id/add-occupant",
  authenticateToken,
  authorizeRole(["admin"]),
  addOccupant
);

// Route to remove an occupant from a unit
router.delete(
  "/:id/remove-occupant",
  authenticateToken,
  authorizeRole(["admin"]),
  removeOccupant
);

export default router;
