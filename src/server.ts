import dotenv from 'dotenv';
import express, {Request, Response} from 'express';
import cors from 'cors';

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json())

app.get('/', (req:Request, res:Response)=>{
    res.send("Hello, if you are watching my this commit then I want to tell you that this is my first ts backend project without any tutorial...")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))

export default app