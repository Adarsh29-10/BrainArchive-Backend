import express from 'express'
import { checkJwt } from '../../middlewares/auth0.middleware';
import { attachUser } from '../../middlewares/auth.middleware';
import {
    createNotebook, 
    getNotebooks, 
    getNotebookById, 
    updateNotebook, 
    deleteNotebook,
    addNotebookBlock,
    deleteNotebookBlock,
    updateNotebookBlockContent,
    getPublicNotebooks,
} from './notebook.controller';


const router = express.Router()

router.get('/public', getPublicNotebooks)

router.use(checkJwt, attachUser);

router.get('/', getNotebooks);
router.post('/', createNotebook);

router.get('/:notebookId', getNotebookById);
router.put('/:notebookId', updateNotebook);
router.delete('/:notebookId', deleteNotebook);

router.post('/:notebookId/block', addNotebookBlock)
router.delete('/:notebookId/block/:BlockId', deleteNotebookBlock)
router.patch('/:notebookId/block', updateNotebookBlockContent)

export default router;