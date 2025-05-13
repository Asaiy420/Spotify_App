import express, { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const Callback = async (req: Request, res: Response): Promise<any> => {
  const { id, firstName, lastName, imageUrl } = req.body;

  try {
    // check if user already exists

    const user = await User.findOne({ clerkId: id }); // clerkId is the unique identifier for the user
    if (!user) {
      // create a new user
      const newUser = await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl,
        clerkId: id,
      });
      return res.status(201).json(newUser);
    }
  } catch (error: any) {
    console.error("Error in callback auth :", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
