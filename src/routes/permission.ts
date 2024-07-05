import { Router } from "express";
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../controllers/permissionController";
import { authenticateToken, authorizeRole, checkAdmin } from "../middleware/auth";
const router = Router();

router.post("/", checkAdmin(),createPermission);
router.get(
  "/",
  authenticateToken,
  
  getPermissions
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  getPermissionById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  updatePermission
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin"]),
  deletePermission
);

export default router;
