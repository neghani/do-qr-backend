import { Router } from "express";
const router = Router();
router.get("/", async (req, res) => {
  const healthCheck: any = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.send(healthCheck);
  } catch (error) {
    healthCheck.message = error;
    res.status(503).send();
  }
});

export default router;
