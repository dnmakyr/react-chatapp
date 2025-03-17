import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRouter } from "./routes/auth.route";
import { connectDB } from "./lib/db";

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 9999;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());

app.use(morgan("dev"));

app.use(cors(corsOptions));

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});


app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});