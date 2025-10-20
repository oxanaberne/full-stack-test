import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import itemsRoutes from "./routes/items.routes";
import { errorHandler } from "./middleware/error.middleware";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);

// health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

export default app;
