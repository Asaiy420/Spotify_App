import express, {Request, Response, NextFunction} from 'express';
import {User} from '../models/user.model.js';

export const getAllUsers = async (req: Request, res:Response, next: NextFunction): Promise<any> => {
    try{
        const currentUserId = req.auth?.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}});    //exclude current user
        

        if (!users){
            return res.status(404).json({message: "No users found"});
        }

        return res.status(200).json(users);
    }catch(error:any){
        console.log("Error in getAllUsers controller", error.message);
        next(error);

    }
}