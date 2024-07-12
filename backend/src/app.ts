import { createServer } from 'http'
import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"
import { BASE_URL } from './constants'

const app = express()
const httpServer = createServer(app)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())

// Routes
import learnerRouter from "./routes/learner.routes"
import instructorRouter from "./routes/instructor.routes"
import errorHandler from './middlewares/error.middleware'

// Route declaration
app.use(`${BASE_URL}/learners`, learnerRouter)
app.use(`${BASE_URL}/instructors`, instructorRouter)

app.use(errorHandler)

export { httpServer }




