import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { 
    createNotebookService, 
    getNotebookByIdService, 
    getNotebooksService, 
    removeNotebookService, 
    updateNotebookService
} from "../services/notebook.service";

export const createNotebook = asyncHandler(
    async(req:Request, res:Response) => {
        const { title, description } = req.body;

        const notebook = await createNotebookService({
            title,
            description,
            userId: req.user?._id.toString(),  //later 
        })

        return res
            .status(201)
            .json(new ApiResponse(201, notebook, 'Notebook created'));
    }
)

export const getNotebooks = asyncHandler(
    async (req:Request, res:Response) => {
        const notebooks = await getNotebooksService({userId: req.user?._id.toString()});
        
        return res
            .status(200)
            .json(new ApiResponse(200, notebooks, 'Notebooks fetched'));
    }
)

export const getNotebookById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const notebook = await getNotebookByIdService({id});

    return res
      .status(200)
      .json(new ApiResponse(200, notebook, 'Notebook fetched successfully'));
  }
);

export const updateNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params;
        const {title, description } = req.body;

        const notebook = await updateNotebookService({
            id,
            title, 
            description
        })

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook updated'));
    }
)

export const removeNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params;

        const notebook = await removeNotebookService({id});

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook deleted'));
    }
) 