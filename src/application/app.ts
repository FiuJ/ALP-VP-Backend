import express from "express"
import { publicRouter } from "../routes/public-router"
import { errorMiddleware } from "../middleware/error-middleware"
import { protectedRouter } from "../routes/protected-router"

const app = express()
app.use(express.json())

app.use(publicRouter)
app.use(errorMiddleware)
app.use(protectedRouter)

export default app