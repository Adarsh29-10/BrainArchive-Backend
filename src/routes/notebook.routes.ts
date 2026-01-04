import express from 'express'
import {
    createNotebook, 
    getNotebooks, 
    getNotebookById, 
    updateNotebook, 
    removeNotebook,
    createSession
} from '../controllers/notebook.controller'

const router = express.Router()

router.post('/', createNotebook);
router.get('/', getNotebooks);

router.get('/:notebookId', getNotebookById);
router.put('/:notebookId', updateNotebook);
router.delete('/:notebookId', removeNotebook);
router.post('/:notebookId/session', createSession)

export default router;