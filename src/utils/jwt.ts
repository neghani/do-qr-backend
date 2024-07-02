import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (user: {
  id: string;
  groupID: string;
  roles: string;
}) => {
  return jwt.sign(
    {
      id: user.id,
      groupID: user.groupID,
      roles: user.roles,
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


