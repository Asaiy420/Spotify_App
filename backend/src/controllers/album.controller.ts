import express, { Request, Response } from "express";

export const Albums = async (req: Request, res: Response) => {
  res.send("Albums Controller is working");
};
