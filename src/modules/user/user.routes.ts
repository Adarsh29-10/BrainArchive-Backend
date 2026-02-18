import express from 'express'
import { checkJwt } from '../../middlewares/auth0.middleware';
import { attachUser } from '../../middlewares/auth.middleware';
import { userMe } from './user.controller';

const router = express.Router()

router.post('/me', checkJwt, attachUser, userMe)

export default router;