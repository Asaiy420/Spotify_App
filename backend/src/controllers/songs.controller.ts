import express, { Request, Response } from "express";

export const Songs = async (req: Request, res: Response) => {
  res.send("Songs Controller is working");
};
