import express, {Request, Response} from 'express';


export const Admin = async (req: Request, res:Response) => {
    res.send("Admin Controller is working");
}