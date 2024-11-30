import mongoose from "mongoose";

export const connect = async () => {
    try {
        const uri = process.env.DB_URI
        const db = await mongoose.connect(uri)
        if (db) {
            console.log("Database connection established")
        }
    } catch (err) {
        console.log("Error connecting to database: " + err.message)
    }
}

