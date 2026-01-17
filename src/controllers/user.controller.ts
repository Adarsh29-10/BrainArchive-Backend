import { userMeService } from "../services/user.service";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";


export const userMe = asyncHandler( 
    async (req:Request, res:Response) => {
        if (!req.user?.auth0Id) {
            throw new ApiError(401, "Unauthorized");
        }

        const { email, name, picture } = req.body;

        const user = await userMeService({
            auth0Id: req.user.auth0Id, 
            email, 
            name, 
            picture
        });

        return res
            .status(200)
            .json(new ApiResponse(200, user));
    }
)

