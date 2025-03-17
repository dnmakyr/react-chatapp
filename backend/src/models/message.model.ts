import mongoose from "mongoose";
import { ObjectId } from "mongodb";

interface IMessage {
  senderId: ObjectId;
  receiverId: ObjectId;
  text: string;
  image: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;