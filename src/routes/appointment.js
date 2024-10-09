const express = require('express')
const router = express.Router();

const { 
    createAppointment, 
    AllAppointments
} = require('../controllers/appointment');

router.post('/create', createAppointment)
router.get('/all', AllAppointments)

module.exports = router;