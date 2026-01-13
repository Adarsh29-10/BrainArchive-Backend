import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';
import {CONNECT_DB} from './db'

import { errorHandler } from './middlewares/error.middleware';
import { checkJwt } from './middlewares/auth0.middleware';
import { attachUser } from './middlewares/auth.middleware';
import notebookRouter from './routes/notebook.routes';
import userRouter from './routes/user.routes';

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())

app.use("/user", checkJwt, attachUser, userRouter);
app.use("/notebooks", checkJwt, attachUser, notebookRouter);

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