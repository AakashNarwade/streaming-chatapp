import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { dbConn } from "./lib/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("hey there server is running on " + PORT);
  dbConn();
});
