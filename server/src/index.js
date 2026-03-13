import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
dotenv.config()
const app = express()

const PORT = process.env.PORT

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`servidor levantado e n el puerto http://localhost:${PORT}`)
        })
    })
 