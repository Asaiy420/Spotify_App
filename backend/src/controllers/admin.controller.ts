import express, {Request, Response} from 'express';


export const Admin = (req: Request, res:Response) => {
    res.send("Admin Controller is working");
}