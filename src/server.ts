import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import sequelize from "./config/database";
import authRoutes from "./routes/auth"; // Import the auth routes
import propertyRoutes from "./routes/property";
import unitRoutes from "./routes/unit";
import permissionRoutes from "./routes/permission";
import visitRoutes from "./routes/visit";
import healthRoutes from "./routes/health";
const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use the auth routes
app.use("/health/ready", healthRoutes);
app.use("/auth", authRoutes);
app.use("/property", propertyRoutes);
app.use("/unit", unitRoutes);
app.use("/permissions", permissionRoutes);
app.use("/visits", visitRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

// Sync all models with the database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized...");
  })
  .catch((err: Error) => {
    console.error("Error synchronizing the database:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
