import express from "express"
import { protectedRoute } from "../middleware/auth.middleware"
import { getUsersForSidebar, getMessages } from "../controllers/message.controller"

export const router = express.Router()

router.get("/users", protectedRoute, getUsersForSidebar)
router.get("/:id", protectedRoute, getMessages)

router.post("/send/:id", protectedRoute, sendMessage)