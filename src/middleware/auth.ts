import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import Permission from "../models/permission";

const secret = process.env.JWT_SECRET || "your_secret_key";
export interface IGetUserAuthInfoRequest extends Request {
  user: string; // or any other type
}
interface DecodedToken {
  id: number;
  groupID: number;
  roles: string;
  iat: number;
  exp: number;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // If no token, return Unauthorized

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
    req.user = decoded as DecodedToken;
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.userId;
    const groupId = req.user.groupId;
    const permissions = await Permission.findAll({
      where: {
        userId,
        groupId,
      },
      attributes: ["role"], // Only select the role attribute
    });

    const dbRoles = permissions.map((permission) => permission.role);

    const hasRequiredRole = roles.some((role) => dbRoles.includes(role));

    if (!hasRequiredRole) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
