import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (user: {
  id: string;
  details?: any;
  permissions?: any;
}) => {
  console.log("details", user.details);

  return jwt.sign(
    {
      details: user.details,
      groupedPermissions: user.permissions,
    },
    secret,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
