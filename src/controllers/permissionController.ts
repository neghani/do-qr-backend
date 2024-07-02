import { Request, Response } from "express";
import Permission from "../models/permission";
import { v4 as uuidv4 } from "uuid";

export const createPermission = async (req: Request, res: Response) => {
  try {
    const { userId, role, groupId } = req.body;

    // Example of role authorization check
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const permission = await Permission.create({
      id: uuidv4(),
      userId,
      role,
      groupId,
    });

    res.status(201).json(permission);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPermissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.status(200).json(permission);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, role, groupId } = req.body;

    // Example of role authorization check
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permission.update({
      userId,
      role,
      groupId,
    });

    res.status(200).json(permission);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Example of role authorization check
    if (!req.user.roles.includes("admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    await permission.destroy();

    res.status(204).end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
