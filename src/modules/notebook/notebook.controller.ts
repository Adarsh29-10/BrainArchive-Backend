import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { Request, Response } from "express";
import { 
    createNotebookService, 
    getNotebookByIdService, 
    getNotebooksService, 
    getPublicNotebooksService,
    deleteNotebookService,
    addNotebookBlockService,
    updateNotebookBlockContentService, 
    updateNotebookService,
    deleteNotebookBlockService
} from "./notebook.service";
import { ApiError } from "../../utils/ApiError";
import { getCurrentUser } from "../../utils/getCurrentUser";


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

export const getPublicNotebooks = asyncHandler(
    async (_req: Request, res: Response) => {
        const notebooks = await getPublicNotebooksService();

        return res
            .status(200)
            .json(new ApiResponse(200, notebooks, 'Public notebooks fetched'));
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

export const deleteNotebookBlock = asyncHandler(
  async (req:Request, res:Response) => {
    const user = await getCurrentUser(req);
    const {notebookId, BlockId} = req.params;

    if (!BlockId) {
      throw new ApiError(400, "Block id is required");
    }

    const notebook = await deleteNotebookBlockService({
      userId: user._id.toString(),
      notebookId,
      BlockId
    })
    
    return res.status(201).json(
      new ApiResponse(201, notebook, 'Notebook Deleted')
    )
    
  }
)

export const updateNotebookBlockContent = asyncHandler(
  async (req: Request, res: Response) => {

    const user = await getCurrentUser(req);

    const { notebookId } = req.params;
    const { _id, content } = req.body;

    if (!_id) {
      throw new ApiError(400, "Block id is required");
    }

    const notebook = await updateNotebookBlockContentService({
      userId: user._id.toString(),
      notebookId,
      _id,
      content
    });

    return res.status(200).json(
      new ApiResponse(200, notebook, "Block content updated")
    );
  }
);
