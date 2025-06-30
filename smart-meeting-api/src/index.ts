import express from "express";
import authRoutes from "./routes/authroutes";
import roomroutes from "./routes/roomroutes";
import bookingRoutes from "./routes/bookingroutes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes); 
app.use("/rooms", roomroutes)
app.use("/bookings", bookingRoutes);

app.listen(3000, () => console.log("Server running"));
