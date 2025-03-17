import express from "express";
import { updateProfile } from "../controllers/user.controller";
import { protectedRoute } from "../middleware/auth.middleware";

export const router = express.Router();

router.post("/update/profile", protectedRoute, updateProfile);
