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
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader);
    if (token == null) return res.sendStatus(401); // If no token, return Unauthorized

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.statusMessage = err.message;
        return res.status(403);
      }
      req.user = decoded as DecodedToken;
      console.log("decoded", decoded);

      next();
    });
  } catch (error) {
    console.log(error);

    res.sendStatus(403);
  }
};

export const checkAdmin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user.details?.isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export const authorizeRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    const groupId = req.user.groupId;
    if (!userId) {
      console.log("Invalid user ID:", userId);
      return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
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
    } catch (error) {
      console.log("Error fetching permission", error);
      res.status(500).json({message: "server error"})
      
    }
    
  };
};

