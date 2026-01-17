import express from 'express'
import { userMe } from '../controllers/user.controller';

const router = express.Router()

router.post('/me', userMe)

export default router;