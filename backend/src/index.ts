import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { useCartRoutes, useProductRoutes } from "./api";

dotenv.config()
const app = express()
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 5000

// Make configurations.
app.use(cors())
app.use(express.json())

// Bind endpoints to the Express server.
useProductRoutes(app)
useCartRoutes(app)

app.listen(port, () => console.log(`Server is running on port ${port}...`))
