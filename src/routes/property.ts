import { Router } from "express";
import PropertyController from "../controllers/property";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = Router();
const controller = new PropertyController();

// CRUD operations for properties with token authentication
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.getAllProperties
);
router.post(
  "/",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.createProperty
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.getPropertyById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.updateProperty
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  controller.deleteProperty
);

export default router;
