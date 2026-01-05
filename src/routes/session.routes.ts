import express from 'express'
import { 
    addBlockToSession, 
    getSessionById, 
    updateSession,
    updateBlock
} from '../controllers/session.controller'

const router = express.Router()

router.get('/:sessionId', getSessionById)

router.post('/:sessionId/blocks', addBlockToSession)
router.patch('/:sessionId/blocks/:blockId', updateBlock)

export default router;