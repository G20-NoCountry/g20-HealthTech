import { Router } from "express";
import authRoutes from "./auth.routes";
import appointmentRoutes from "./appointment.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/", appointmentRoutes);

export default router;
