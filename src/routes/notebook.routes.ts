import express from 'express'
import {
    createNotebook, 
    getNotebooks, 
    getNotebookById, 
    updateNotebook, 
    deleteNotebook,
    updateNotebookBlock,
    addNotebookBlock
} from '../controllers/notebook.controller'

const router = express.Router()

router.post('/', createNotebook);
router.get('/', getNotebooks);

router.get('/:notebookId', getNotebookById);
router.put('/:notebookId', updateNotebook);
router.delete('/:notebookId', deleteNotebook);

router.post('/:notebookId/block', addNotebookBlock)
router.patch('/:notebookId/blocks', updateNotebookBlock)

export default router;