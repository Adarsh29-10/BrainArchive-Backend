import express from 'express'
import { getPublicNotebooks } from '../controllers/notebook.controller';

const router = express.Router();

router.get('/notebooks', getPublicNotebooks);

export default router;
