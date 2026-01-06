import { Session } from "node:inspector";
import { LearningSession } from "../models/LearningSession.model"
import { Notebook } from "../models/Notebook.model"
import { ApiError } from "../utils/ApiError"
import { BlockType } from "../types/blocks.types";

export const createSessionService = async (data:{
    notebookId:string,
    userId:string,
}) => {
    if(!data.notebookId){
        throw new ApiError(400, 'Notebook id is required');
    }

    const notebook = await Notebook.findOne({
        _id: data.notebookId,
        userId: data.userId
    })

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    const session = await LearningSession.create({
        notebookId: data.notebookId,
        title: `Today's Learning`,
        blocks: [],
        totalTimeSpent: 0
    })

    if(!session){
        throw new ApiError(500, 'Server Error')
    }

    return session;
}

export const getSessionByIdService = async (data:{
    sessionId:string;
}) => {
    const session = await LearningSession.findById(data.sessionId);

    if(!session){
        throw new ApiError(404, 'Session not found');
    }

    return session;
}

export const updateSessionService = async (data: {
    sessionId:string,
    title?:string,
    blocks:any[],
}) => {
    const session = await LearningSession.findById(data.sessionId);

    if(!session){
        throw new ApiError(404, 'Session not found');
    }

    if(data.title !== undefined){
        session.title = data.title;
    }
    if(data.blocks !== undefined){
        session.blocks = data.blocks;
    }

    await session.save();
    return session;

}

export const deleteSessionService = async (data:{
    sessionId:string;
}) => {
    const session = await LearningSession.findByIdAndDelete(data.sessionId);

    if(!session){
        throw new ApiError(404, 'Session not found');
    }

    return session;
}

export const addBlockToSessionService = async (data:{
    sessionId:string;
    type:BlockType;
    content:string;
    order:number;
}) => {
    const session = await LearningSession.findById(data.sessionId);

    if(!session){
        throw new ApiError(404, 'Session not found');
    }

    if(!data.type || !data.content || !data.order  ){
        throw new ApiError(400, 'All fields are required');
    }

    session.blocks.push({
        type: data.type,
        content: data.content,
        order: data.order,
    })

    await session.save();
    return session;
}

export const updateBlockService = async (data:{
    sessionId:string;
    blockId:string;
    content:string;
}) => {
    const session = await LearningSession.findById(data.sessionId);

    if(!session){
        throw new ApiError(404, 'Session not found');
    }

    // const block = session.blocks(data.blockId);

    // if(!block){
    //     throw new ApiError(404, 'Block not found');
    // }
    
    // if (data.type !== undefined) block.type = data.type;
    // if (data.content !== undefined) block.content = data.content;

    // await session.save();
    // return block;
}