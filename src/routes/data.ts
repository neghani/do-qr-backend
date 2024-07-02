import { Router, Request, Response } from "express";
import { authenticateToken, authorizeRole } from "../middleware/auth";

const router = Router();

// Secured route that requires JWT authentication and role authorization
router.get(
  "/",
  [authenticateToken, authorizeRole(["Admin"])],
  (req: Request, res: Response) => {
    res
      .status(200)
      .json({ message: "Access to secured data granted", user: req.body.user });
  }
);

export default router;
