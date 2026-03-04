import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';
import {CONNECT_DB} from './db'

import { errorHandler } from './middlewares/error.middleware';
import notebookRouter from './modules/notebook/notebook.routes';
import userRouter from './modules/user/user.routes';

dotenv.config()

const app = express()

// app.use(cors());
app.use(cors({
    origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL || "https://brainarchive.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" })
})

app.use("/user", userRouter);
app.use("/notebooks", notebookRouter);

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try{
        await CONNECT_DB()
        app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
    }
    
    catch(error){
        console.log('MONGO DB CONNECTION FAILED!', error)
    }
}

startServer()

app.use(errorHandler);

export default app
