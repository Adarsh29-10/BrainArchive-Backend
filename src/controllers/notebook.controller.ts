import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { Notebook } from "../models/Notebook.model";

export const createNotebook = asyncHandler(
    async(req:Request, res:Response) => {
        const { title, description } = req.body;

        if(!title){
            return new ApiError(400, 'Title is required');
        }

        const notebook = await Notebook.create({
            title,
            description,
            user: req.user?._id,  //later 
        })

        return res
            .status(201)
            .json(new ApiResponse(201, notebook, 'Notebook created'));
    }
)

export const getNotebooks = asyncHandler(
    async (req:Request, res:Response) => {
        const notebooks = await Notebook.find({ user: req.user?._id});
        
        return res
            .status(200)
            .json(new ApiResponse(201, notebooks, 'Notebooks fetched'));
    }
)

export const getNotebookById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: notebookId } = req.params;

    if (!notebookId) {
      throw new ApiError(400, 'Notebook id is required');
    }

    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      throw new ApiError(404, 'Notebook not found');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, notebook, 'Notebook fetched successfully'));
  }
);

export const updateNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params;
        const {title, description } = req.body;

        if(!title){
            return new ApiError(400, 'Title is required');
        }

        const notebook = await Notebook.findByIdAndUpdate(
            id,
            {title, description},
            {new:true, runValidators:true}
        );

        if(!notebook){
            return new ApiError(404, 'Notebook not found');
        }

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook updated'));
    }
)

export const removeNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params;

        const notebook = await Notebook.findByIdAndDelete(
            id
        )

        if(!notebook){
            return new ApiError(404, 'Notebook not found');
        }

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook deleted'));
    }
) 