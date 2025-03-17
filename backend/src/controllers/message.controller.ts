import { Request, Response } from "express";
import { CustomRequest } from "../types/shared/CustomRequest";
import User from "../models/user.model";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const getUsersForSidebar = async (req: CustomRequest, res: Response) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    return res.status(200).json({ users: filteredUsers });
  } catch (error) {
    console.error("Error getting users for sidebar: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { id: userId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userId },
        { sender: userId, receiver: myId },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error getting messages: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
