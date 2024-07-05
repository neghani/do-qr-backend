import { Router, Request, Response } from "express";
import User from "../models/user";
import { generateToken, verifyToken } from "../utils/jwt";
import { v4 as uuidv4 } from "uuid";
import Permission from "../models/permission";
import { Op } from "sequelize";

const router = Router();
// Signup route

router.post("/signup", async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobile, password, dateOfBirth } =
    req.body;

  if ((!email || !mobile) && !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the mobile number or email already exists
    const existingUser = await User.findOne({ where: { mobile } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Mobile number or email already in use" });
    }

    // Create a new user instance without the password
    const user = new User({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      mobile,
      password,
      dateOfBirth,
    });

    // Save the user
    await user.save();
    // Generate a token for the user
    const token = generateToken({
      id: user.id,
      details: user,
    });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Login route
router.post("/login", async (req: Request, res: Response) => {
  const { username, password, groupId } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Find the user by mobile number
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: {
              $eq: username,
            },
          },
          {
            mobile: {
              $eq: username,
            },
          },
        ],
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }
    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid mobile/email number or password" });
    }
    const userId = user.id;

    const permissions = await Permission.findAll({
      where: { userId, groupId },
      attributes: ["role"],
    });

    const token = generateToken({
      id: user.id,
      details: user,
      permissions: permissions,
    });

    res.status(201).json({ message: "User logged in successfully", token });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default router;
