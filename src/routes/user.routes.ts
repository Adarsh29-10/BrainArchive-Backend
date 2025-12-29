import express from 'express'
import { User } from "../models/User.model";

const router = express.Router()

router.get('/me', (req, res)=>{
    res.status(200).json(req.user);
})

export default router;