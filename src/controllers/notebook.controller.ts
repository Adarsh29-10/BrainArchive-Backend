import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { Request, Response } from "express";
import { 
    createNotebookService, 
    getNotebookByIdService, 
    getNotebooksService, 
    deleteNotebookService,
    addNotebookBlockService,
    updateNotebookBlockService, 
    updateNotebookService,
} from "../services/notebook.service";
import { ApiError } from "../utils/ApiError";
import { getCurrentUser } from "../utils/getCurrentUser";


export const createNotebook = asyncHandler(
    async(req:Request, res:Response) => {
        const { title, description, isPublic } = req.body;

        const user = await getCurrentUser(req);

        const notebook = await createNotebookService({
            title,
            description,
            userId: user._id.toString(),
            isPublic,
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
        const user = await getCurrentUser(req);
        
        const notebooks = await getNotebooksService({userId: user?._id.toString()});
        
        return res
            .status(200)
            .json(new ApiResponse(200, notebooks, 'Notebooks fetched'));
    }
)


export const getNotebookById = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUser(req);
    const { notebookId } = req.params;

    const notebook = await getNotebookByIdService({
      notebookId: notebookId,
      userId: user._id.toString()
    });

    return res
      .status(200)
      .json(new ApiResponse(200, notebook, 'Notebook fetched successfully'));
  }
);


export const updateNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const user = await getCurrentUser(req);

        const {notebookId} = req.params;
        const {title, description, isPublic } = req.body;

        const notebook = await updateNotebookService({
            notebookId,
            userId: user._id.toString(),
            title, 
            description,
            isPublic
        })

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook updated'));
    }
)


export const deleteNotebook = asyncHandler(
    async (req:Request, res:Response) => {
        const user = await getCurrentUser(req);
        const {notebookId} = req.params;

        const notebook = await deleteNotebookService({
          notebookId: notebookId,
          userId: user._id.toString(),
        });

        return res
            .status(200)
            .json(new ApiResponse(200, notebook, 'Notebook deleted'));
    }
) 

export const updateNotebookBlock = asyncHandler(
  async (req: Request, res: Response) => {

    const user = await getCurrentUser(req);

    const { notebookId } = req.params;
    const { blocks } = req.body;

    if (!Array.isArray(blocks)) {
      throw new ApiError(400, "Blocks must be an array");
    }

    const notebook = await updateNotebookBlockService({
      userId: user._id.toString(),
      notebookId,
      blocks,
      
    });

    return res.status(200).json(
      new ApiResponse(200, notebook, "Notebook blocks updated")
    );
  }
);


export const addNotebookBlock = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await getCurrentUser(req);
    const { notebookId } = req.params;
    const { _id, type, prevBlockId } = req.body;

    if (!_id) {
      throw new ApiError(400, "Block id is required");
    }

    if (!type) {
      throw new ApiError(400, "Block type is required");
    }

    const notebook = await addNotebookBlockService({
      userId: user._id.toString(),
      notebookId,
      _id,
      type,
      prevBlockId,
    });

    return res.status(201).json(
      new ApiResponse(201, notebook, "Block added")
    );
  }
);

