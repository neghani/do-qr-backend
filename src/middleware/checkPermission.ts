import { Response, NextFunction } from "express";
import { Op } from "sequelize";
import Permission from "../models/permission";

export default function checkPermission(roles: [any], groups: string[]) {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId as number;
      const permissions = await Permission.findAll({
        where: {
          userId,
          roleId: { [Op.in]: roles.map((role) => role.id) }, // Use Op.in for array inclusion
          groupId: { [Op.in]: groups }, // Use Op.in for array inclusion
        },
      });

      if (permissions.length === 0) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient permissions" });
      }
      next();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
