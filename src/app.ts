require('dotenv').config()
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/user', userRouter)

export default app