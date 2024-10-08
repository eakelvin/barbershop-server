require('dotenv/config')
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_DB

const Database = async () => {
    try {
        const connect = await mongoose.connect(MONGO_URI)
        if (connect.connection.host) {
            console.log("Database Connected to Server")
        }
    } catch (error) {
        console.error(`Error: ${error.message}`)
    }
}

module.exports = Database