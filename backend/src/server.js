import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import useRoutes from "./routes/user.route.js";

import { dbConn } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", useRoutes);


app.listen(PORT, () => {
  console.log("hey there server is running on " + PORT);
  dbConn();
});
