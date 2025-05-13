import express, {Request, Response} from 'express';


export const Users = (req: Request, res:Response) => {
    res.send("Users Controller is working");
}