import express, {Request, Response} from 'express';


export const Users = async (req: Request, res:Response) => {
    res.send("Users Controller is working");
}