import express from "express";
import { login, logout, signup, user } from '../controllers/auth.controller';

export const router = express.Router();

router.post("/signup", signup);

router.get("/login", login);

router.get("/logout", logout);

router.get("/user", user);