import { Router } from "express";
import {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../controllers/permissionController";
import { authenticateToken, authorizeRole } from "../middleware/auth";
const router = Router();

router.post("/", authenticateToken, authorizeRole(["admin"]), createPermission);
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin", "user"]),
  getPermissions
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRole(["admin", "user"]),
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
