import express from "express"
import { publicRouter } from "../routes/public-router"
import { errorMiddleware } from "../middleware/error-middleware"
import { protectedRouter } from "../routes/protected-router"
import { authMiddleware } from "../middleware/auth-middleware"

const app = express()
app.use(express.json())

// Public routes do not require authentication
app.use(publicRouter)

// Protected routes need authentication
app.use(authMiddleware, protectedRouter)

// Error handling middleware should be last
app.use(errorMiddleware)

export default app
