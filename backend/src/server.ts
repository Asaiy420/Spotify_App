import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import fileUpload from "express-fileupload";
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { clerkMiddleware } from "@clerk/express";
import path from "path";

const app = express();
const __dirname = path.resolve(); // __dirname is the directory name of the current module
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware()); // this will add req.auth object to the request
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true, // create parent directories if they don't exist
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  })
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
