import { Router } from "express";
import PropertyController from "../controllers/property";
import {
  authenticateToken,
  authorizeRole,
  checkAdmin,
} from "../middleware/auth";

const router = Router();
const controller = new PropertyController();

// CRUD operations for properties with token authentication
router.get("/", authenticateToken, controller.getAllProperties);
router.get("/:id", authenticateToken, controller.getPropertyById);
router.post("/", authenticateToken, controller.createProperty);
router.put("/:id", authenticateToken, controller.updateProperty);
router.delete(
  "/:id",
  authenticateToken,
  checkAdmin(),
  controller.deleteProperty
);

export default router;
