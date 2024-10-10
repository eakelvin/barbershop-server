const express = require('express');
const router = express.Router();

const { 
    createContact,
    allContacts 
} = require('../controllers/contact')

router.post('/create', createContact)
router.get('/all', allContacts )

module.exports = router;