import { createServer } from 'http'
import express from 'express'
import cors from "cors"
import { BASE_URL } from './constants'

const app = express()
const httpServer = createServer(app)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

// Routes
import learnerRouter from "./routes/learner.routes"
import errorHandler from './middlewares/error.middleware'

// Route declaration
app.use(`${BASE_URL}/learners`, learnerRouter)

app.use(errorHandler)

export { httpServer }




