import express from 'express'
import {
    createNotebook, 
    getNotebooks, 
    getNotebookById, 
    updateNotebook, 
    removeNotebook
} from '../controllers/notebook.controller'

const router = express.Router()

router.post('/', createNotebook);
router.get('/', getNotebooks);

router.get('/:id', getNotebookById);
router.put('/:id', updateNotebook);
router.delete('/:id', removeNotebook);

export default router;