import express, { Request, Response } from "express";

export const Albums = (req: Request, res: Response) => {
  res.send("Albums Controller is working");
};
