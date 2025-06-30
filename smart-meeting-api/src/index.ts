/// <reference path="./types/express/index.d.ts" />
import express from "express";
import authRoutes from "./routes/authroutes";
import roomRoutes from "./routes/roomroutes";
import bookingroutes from "./routes/bookingroutes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/rooms", roomRoutes);

app.use("/bookings",bookingroutes)
app.listen(3000, () => console.log("Server running"));
