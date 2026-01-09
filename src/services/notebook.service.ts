import { Notebook } from "../models/Notebook.model";
import { BlockType } from "../types/blocks.types";
import { ApiError } from "../utils/ApiError";

export const createNotebookService = async(data: {
    title:string;
    description?:string;
    userId: string;
    isPublic: boolean;
    blocks: {
        type: BlockType;
        content: string;
        order: number;
    }[];
    totalTimeSpent: number;
    lastActivityAt: Date | null;
}) => {
    if(!data.title){
        throw new ApiError(400, 'Title is required');
    }

    const notebook = await Notebook.create({
        title: data.title,
        description: data.description,
        userId: data.userId,
        isPublic: data.isPublic,
        blocks: data.blocks,
        totalTimeSpent: data.totalTimeSpent,
        lastActivityAt: data.lastActivityAt,
    });
    
    return notebook;
}


export const getNotebooksService = async(data: {
    userId:string,
}) => {
    if (!data.userId || data.userId === "undefined") {
        throw new ApiError(401, 'User ID not found. User may not be authenticated.');
    }

    const notebooks = await Notebook.find({ userId: data.userId});

    return notebooks;
}


export const getNotebookByIdService = async(data: {
    notebookId:string
}) => {
    if(!data.notebookId){
        throw new ApiError(400, 'Notebook id is required');
    }

    const notebook = await Notebook.findById(data.notebookId)

    if (!notebook) {
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}


export const updateNotebookService = async(data: {
    notebookId:string,
    title:string,
    description?:string
}) => {
    if(!data.title) {
        throw new ApiError(400, "Title is required");
    }

    const notebook = await Notebook.findByIdAndUpdate(
        data.notebookId,
        {title: data.title, description: data.description},
        {new:true, runValidators:true}
    );

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}


export const deleteNotebookService = async(data: {
    notebookId: string,
}) => {
    const notebook = await Notebook.findByIdAndDelete(
        data.notebookId
    )

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}

export const updateNotebookBlockService = async (data: {
  userId: string;
  notebookId: string;
  blocks: {
    type: BlockType;
    content: string;
    order?: number;
  }[];
}) => {
  const notebook = await Notebook.findOne({
    _id: data.notebookId,
    userId: data.userId,
  });

  if (!notebook) {
    throw new ApiError(404, "Notebook not found");
  }

  notebook.blocks = data.blocks.map((block, index) => ({
    type: block.type,
    content: block.content,
    order: block.order ?? index,
  }));

  notebook.lastActivityAt = new Date();

  if (data.totalTimeSpent !== undefined) {
    notebook.totalTimeSpent = data.totalTimeSpent;
  }

  await notebook.save();
  return notebook;
};


