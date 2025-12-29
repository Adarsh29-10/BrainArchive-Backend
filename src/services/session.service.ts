import { LearningSession } from "../models/LearningSession.model"
import { Notebook } from "../models/Notebook.model"
import { ApiError } from "../utils/ApiError"

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