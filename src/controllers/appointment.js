const Appointment= require('../models/appointment');

const createAppointment = async(req, res) => {
    try {
        const appointment = await Appointment.create(req.body)
        res.status(201).json(appointment)
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error.message 
        });
    }
}

const AllAppointments = async(req, res) => {
    try {
        const appointment = await Appointment.find()
        res.json(appointment)
    } catch (error) {
        res.status(500).json({ 
            error: 'Server Error' 
        });
    }
}

module.exports = { createAppointment, AllAppointments };