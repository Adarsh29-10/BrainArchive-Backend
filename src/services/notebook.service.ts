import { Notebook } from "../models/Notebook.model";
import { ApiError } from "../utils/ApiError";

export const createNotebookService = async(data: {
    title:string,
    description:string,
    userId: string,
}) => {
    if(!data.title){
        throw new ApiError(400, 'Title is required');
    }

    const notebook = await Notebook.create({
        title: data.title,
        description: data.description,
        userId: data.userId
    });
    
    return notebook;
}

export const getNotebooksService = async(data: {
    userId:string,
}) => {
    const notebooks = await Notebook.find({ userId: data.userId});

    return notebooks;
}

export const getNotebookByIdService = async(data: {
    id:string
}) => {
    if(!data.id){
        throw new ApiError(400, 'Notebook id is required');
    }

    const notebook = await Notebook.findById(data.id)

    if (!notebook) {
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}

export const updateNotebookService = async(data: {
    id:string,
    title:string,
    description?:string
}) => {
    if(!data.title) {
        throw new ApiError(400, "Title is required");
    }

    const notebook = await Notebook.findByIdAndUpdate(
        data.id,
        {title: data.title, description: data.description},
        {new:true, runValidators:true}
    );

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}

export const removeNotebookService = async(data: {
    id: string,
}) => {
    const notebook = await Notebook.findByIdAndDelete(
        data.id
    )

    if(!notebook){
        throw new ApiError(404, 'Notebook not found');
    }

    return notebook;
}