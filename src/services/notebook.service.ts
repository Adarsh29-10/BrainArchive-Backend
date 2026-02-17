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

    const notebooks = await Notebook.find({ userId: data.userId})
        .sort({updatedAt: -1})

    return notebooks;
}

export const getPublicNotebooksService = async () => {
    const notebooks = await Notebook.find({ isPublic: true })
        .sort({ updatedAt: -1 });

    return notebooks;
}


export const getNotebookByIdService = async(data: {
    notebookId:string,
    userId: string
}) => {
    if(!data.notebookId){
        throw new ApiError(400, 'Notebook id is required');
    }

    const notebook = await Notebook.findById({
        _id: data.notebookId,
        userId: data.userId
    })

    if (!notebook) {
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}


export const updateNotebookService = async(data: {
    notebookId:string;
    userId: string;
    title: string;
    description?: string;
    isPublic: boolean;
}) => {
    if(!data.title) {
        throw new ApiError(400, "Title is required");
    }

    const notebook = await Notebook.findByIdAndUpdate(
        {
            _id: data.notebookId,
            userId: data.userId
        },
        {
            title: data.title, 
            description: data.description,
            isPublic: data.isPublic
        },
        {new:true, runValidators:true}
    );

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}


export const deleteNotebookService = async(data: {
    notebookId: string,
    userId: string
}) => {
    const notebook = await Notebook.findByIdAndDelete({
        _id: data.notebookId,
        userId: data.userId
    })

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}


export const addNotebookBlockService = async (data: {
  userId: string;
  notebookId: string;
  _id: string;
  type: BlockType;
  prevBlockId?: string;
}) => {
  const notebook = await Notebook.findOne({
    _id: data.notebookId,
    userId: data.userId,
  });

  if (!notebook) {
    throw new ApiError(404, "Notebook not found");
  }

  const existing = notebook.blocks.id(data._id);
  if (existing) {
    throw new ApiError(400, "Block id already exists");
  }

  const newBlock = {
    _id: data._id,
    type: data.type,
    content: "",
  };

  if (!data.prevBlockId) {
    notebook.blocks.push(newBlock);
  } else {
    const index = notebook.blocks.findIndex(
      b => b._id === data.prevBlockId
    );

    if (index === -1) {
      notebook.blocks.push(newBlock);
    } else {
      notebook.blocks.splice(index + 1, 0, newBlock);
    }
  }

  notebook.lastActivityAt = new Date();

  await notebook.save();

  return notebook;
};

export const deleteNotebookBlockService = async (data: {
  userId: string;
  notebookId: string;
  BlockId: string;
}) => {
  const notebook = await Notebook.findOne({
    _id: data.notebookId,
    userId: data.userId,
  });

  if (!notebook) {
    throw new ApiError(404, "Notebook not found");
  }

  const blockExists = notebook.blocks.some(
    b => b._id === data.BlockId
  );
  if(!blockExists){
    throw new ApiError(404, 'Block not found')
  }

  notebook.blocks.pull({_id: data.BlockId});

  notebook.lastActivityAt = new Date();

  await notebook.save()

  return notebook;
}

export const updateNotebookBlockContentService = async (data: {
  userId: string;
  notebookId: string;
  _id: string;
  content: string;
}) => {
  const notebook = await Notebook.findOne({
    _id: data.notebookId,
    userId: data.userId,
  });

  if (!notebook) {
    throw new ApiError(404, "Notebook not found");
  }

  const block = notebook.blocks.find(
    b => b._id === data._id
  );
  if(!block){
    throw new ApiError(404, 'Block not found')
  }

  block.content = data.content;

  notebook.lastActivityAt = new Date();

  await notebook.save();
  return notebook;
};
