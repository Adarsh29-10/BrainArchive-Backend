import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => res.json({ status: 'ok' }))


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})