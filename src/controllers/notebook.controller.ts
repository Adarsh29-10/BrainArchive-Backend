import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { 
    createNotebookService, 
    getNotebookByIdService, 
    getNotebooksService, 
    deleteNotebookService, 
    updateNotebookBlockService, 
    updateNotebookService,
} from "../services/notebook.service";
import { ApiError } from "../utils/ApiError";


export const createNotebook = asyncHandler(
    async(req:Request, res:Response) => {
        const { title, description } = req.body;

        const notebook = await createNotebookService({
            title,
            description,
            userId: req.user!._id.toString(),
            isPublic: false,
            blocks: [],
            totalTimeSpent: 0,
            lastActivityAt: null,   
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
    const { notebookId } = req.params;

    const notebook = await getNotebookByIdService({notebookId});

    return res
      .status(200)
      .json(new ApiResponse(200, notebook, 'Notebook fetched successfully'));
  }
);


export const updateNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const {notebookId} = req.params;
        const {title, description } = req.body;

        const notebook = await updateNotebookService({
            notebookId,
            title, 
            description
        })

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook updated'));
    }
)


export const deleteNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const {notebookId} = req.params;

        const notebook = await deleteNotebookService({notebookId});

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook deleted'));
    }
) 

// export const updateNotebookBlock = asyncHandler(
//     async (req:Request, res:Response) => {
//         const {notebookId} = req.params;
//         const {blocks, totalTimeSpent} = req.body;

//         const block = await updateNotebookBlockService({
//             userId: req.user!._id.toString(),
//             notebookId,
//             blocks,
//             totalTimeSpent,
//         });

//         return res
//             .status(200)
//             .json(new ApiResponse(200, block, 'Block created'));
//     }
// );

export const updateNotebookBlock = asyncHandler(
  async (req: Request, res: Response) => {

    if (!req.user) {
      throw new ApiError(401, "Unauthorized");
    }

    const { notebookId } = req.params;
    const { blocks } = req.body;

    if (!Array.isArray(blocks)) {
      throw new ApiError(400, "Blocks must be an array");
    }

    const notebook = await updateNotebookBlockService({
      userId: req.user._id.toString(),
      notebookId,
      blocks,
      
    });

    return res.status(200).json(
      new ApiResponse(200, notebook, "Notebook blocks updated")
    );
  }
);



