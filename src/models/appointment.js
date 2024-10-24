const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    request: {
        type: String,
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required:true
    }
}, { timestamps: true})

const Appointment = mongoose.model("Appointment", AppointmentSchema)
module.exports = Appointment