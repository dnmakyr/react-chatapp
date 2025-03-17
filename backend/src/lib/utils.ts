import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export const generateToken = (userId: string | ObjectId, res: Response) => {
  const access_token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "30m", 
    });
    res.cookie("access_token", access_token, {
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    })

  const refresh_token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
    });
    res.cookie("refresh_token", refresh_token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    });

  return { access_token, refresh_token };   
}