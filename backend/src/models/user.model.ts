import { Schema, model } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
