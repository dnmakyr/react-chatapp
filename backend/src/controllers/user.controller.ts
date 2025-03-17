import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import cloudinary from "../lib/cloudinary";
import { CustomRequest } from "../types/shared/CustomRequest";

export const updateProfile = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const {profileAvatar} = req.body;
        const userId = req.user._id;
        
        if (!profileAvatar) {
            return res.status(400).json({ message: "Please provide a profile avatar" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profileAvatar)
        const updatedUser = await User.findByIdAndUpdate(userId, { profileAvatar: uploadResponse.secure_url }, { new: true });

        return res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}