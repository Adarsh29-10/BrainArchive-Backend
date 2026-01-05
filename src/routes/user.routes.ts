import express from 'express'
import { User } from "../models/User.model";
import { Request, Response } from 'express';

const router = express.Router()

router.get('/me', (req:Request, res:Response)=>{
    res.status(200).json(req.user);
})

export default router;