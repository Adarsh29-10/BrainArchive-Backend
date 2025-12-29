import { Request, Response } from "express"
import { createSessionService } from "../services/session.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createSession = asyncHandler(
    async (req:Request, res:Response) => {
        const {notebookId} = req.params;

        const session = await createSessionService({
            notebookId,
            userId: req.user?._id.toString(),
        });

        return res
            .status(201)
            .json(new ApiResponse(201, session, 'Session created'));
    }
);