import express from "express"
import dotenv from "dotenv"
import cors from 'cors' 
import { connectDB } from "./config/db.js"
import  productoRouter  from "./routes/productoRoutes.js"
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())



app.use("/api/productos", productoRouter)
const PORT = process.env.PORT

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`servidor levantado e n el puerto http://localhost:${PORT}`)
        })
    })
  