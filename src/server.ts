import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';
import {CONNECT_DB} from './db'

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())



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

export default app