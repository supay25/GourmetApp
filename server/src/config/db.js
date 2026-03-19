import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDB = async()=>{
    try {
        const dbURI = process.env.MONGO_URI
        mongoose.connect(dbURI)
        console.log("Conexion Exitosa")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

