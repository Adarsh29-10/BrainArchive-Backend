import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";

export const attachUser = async (req: Request,_res: Response, next: NextFunction) => {
    try {
        const auth = req.auth;

        if (!auth) {
            return next();
        }

        const auth0Id = auth.sub!;
        const email =
            auth.email ||
            auth["https://brainarchive/email"] ||
            `${auth0Id}@auth0.local`;


        let user = await User.findOne({ auth0Id });

        if (!user) {
            user = await User.create({
                auth0Id,
                email,
                name: auth.name,
            });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error); 
    }
};
