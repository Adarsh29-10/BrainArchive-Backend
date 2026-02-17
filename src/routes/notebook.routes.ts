import express from 'express'
import {
    createNotebook, 
    getNotebooks, 
    getNotebookById, 
    updateNotebook, 
    deleteNotebook,
    addNotebookBlock,
    deleteNotebookBlock,
    updateNotebookBlockContent,
} from '../controllers/notebook.controller'

const router = express.Router()

router.post('/', createNotebook);
router.get('/', getNotebooks);

router.get('/:notebookId', getNotebookById);
router.put('/:notebookId', updateNotebook);
router.delete('/:notebookId', deleteNotebook);

router.post('/:notebookId/block', addNotebookBlock)
router.delete('/:notebookId/block/:BlockId', deleteNotebookBlock)
router.patch('/:notebookId/blocks', updateNotebookBlockContent)

export default router;