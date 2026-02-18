import express from 'express'
import { checkJwt } from '../../middlewares/auth0.middleware';
import { attachUser } from '../../middlewares/auth.middleware';
import { userMe } from './user.controller';

const router = express.Router()

router.use(checkJwt, attachUser);

router.post('/me', userMe)

export default router;