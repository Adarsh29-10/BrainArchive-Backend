import { Request, Response } from "express"
import { 
    addBlockToSessionService,
    getSessionByIdService,
    updateSessionService,
    deleteSessionService,
    updateBlockService
} from "../services/session.service";

import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getSessionById = asyncHandler(
    async (req:Request, res:Response) => {
        const {sessionId} = req.params;

        const session = await getSessionByIdService({
            sessionId
        });

        return res
            .status(200)
            .json(new ApiResponse(200, session, 'session fetched'));
    }
);

export const updateSession = asyncHandler(
    async (req:Request, res:Response) => {
        const {sessionId} = req.params;
        const {title} = req.body;

        const session = await updateSessionService({
            sessionId,
            title
        });

        return res
            .status(201)
            .json(new ApiResponse(201, session, 'Session updated'));
    }
);

export const deleteSession = asyncHandler(
    async (req:Request, res:Response) => {
        const {sessionId} = req.params;

        const session = await deleteSessionService({
            sessionId
        });

        return res
            .status(200)
            .json(new ApiResponse(200, session, 'session fetched'));
    }
);


export const addBlockToSession = asyncHandler(
    async (req:Request, res:Response) => {
        const {sessionId} = req.params;
        const {type, content, order} = req.body;

        const block = await addBlockToSessionService({
            sessionId,
            type, content, order,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, block, 'Block created'));
    }
);

export const updateBlock = asyncHandler(
    async (req:Request, res:Response) => {
        const {sessionId, blockId} = req.params;
        const {type, content} = req.body;

        const block = await updateBlockService({
            sessionId,
            blockId,
            content,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, block, 'Block created'));
    }
);



