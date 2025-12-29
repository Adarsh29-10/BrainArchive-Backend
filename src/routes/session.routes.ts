import express from 'express'
import { createSession } from '../controllers/session.controller'
const router = express.Router()

router.post('/session', createSession)