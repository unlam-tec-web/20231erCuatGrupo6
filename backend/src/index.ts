import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { useCartRoutes, useProductRoutes , useAuthRoutes } from "./api";
import path from "node:path";

dotenv.config()
const app = express()
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 5000
console.log( port)



// Make configurations.
app.use(cors())
app.use(express.json())

const staticPath = path.join(__dirname, "../",  'public');
app.use('/public', express.static(staticPath));

// Bind endpoints to the Express server.
useProductRoutes(app)
useCartRoutes(app)
useAuthRoutes(app)

app.listen(port, () => console.log(`Server is running on port ${port}...`))
