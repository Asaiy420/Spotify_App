import { clerkClient } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const currentUser = await clerkClient.users.getUser(userId);
    const isAdmin =
      process.env.ADMIN_EMAIL! ===
      currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error:any) {
    console.error("Error in requireAdmin middleware:", error.message);
    next(error);
  }
};
