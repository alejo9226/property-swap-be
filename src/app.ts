import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user'
import propertyRouter from './routes/property'
import uploadRouter from './routes/upload'
import { formData } from './utils/formData'


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/user', userRouter)
app.use('/property', propertyRouter)
app.use('/upload', uploadRouter)

export default app