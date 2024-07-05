import { Router } from "express";
import {
  UnitController,
  addOccupant,
  removeOccupant,
} from "../controllers/unit";
import { authenticateToken, authorizeRole,checkAdmin } from "../middleware/auth";

const router = Router();
const controller = new UnitController();

// CRUD operations for units with token authentication
router.get("/", authenticateToken, controller.getAllUnits);
router.get("/:id", authenticateToken, controller.getUnitById);

router.post(
  "/",
  authenticateToken,
  checkAdmin(),
  controller.createUnit
);
router.put(
  "/:id",
  authenticateToken,
  checkAdmin(),
  controller.updateUnit
);
router.delete(
  "/:id",
  authenticateToken,
  checkAdmin(),
  controller.deleteUnit
);

router.post(
  "/:id/add-occupant",
  authenticateToken,
  checkAdmin(),
  addOccupant
);

// Route to remove an occupant from a unit
router.delete(
  "/:id/remove-occupant",
  authenticateToken,
  checkAdmin(),
  removeOccupant
);

export default router;
