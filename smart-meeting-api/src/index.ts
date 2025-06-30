import express from "express";
import authRoutes from "./routes/authroutes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes); // ✅

app.listen(3000, () => console.log("Server running"));
