import express, { Request, Response } from "express";

export const Stats = async (req: Request, res: Response) => {
  res.send("Stats Controller is working");
};
