import { Router } from "express";
import { login } from "../controllers/authcontrollers"; // ✅ import nommé

const router = Router();

// 🟢 cette ligne doit fonctionner sans erreur
router.post("/login", login);

export default router;
