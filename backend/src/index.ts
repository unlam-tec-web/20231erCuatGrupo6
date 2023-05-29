import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { useCartRoutes, useProductRoutes } from "./api";

dotenv.config()
const app = express()
app.use(cors())
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 5000
console.log( port)
// Make configurations.

app.use(express.json())

// Bind endpoints to the Express server.
useProductRoutes(app)
useCartRoutes(app)

app.listen(port, () => console.log(`Server is running on port ${port}...`))
