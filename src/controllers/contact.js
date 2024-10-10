const Contact = require('../models/contact')

const createContact = async(req, res) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(201).json(contact)
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
};

const allContacts = async(req, res) => {
    try {
        const contact = await Contact.find()
        res.json(contact)
    } catch (error) {
        res.status(500).json({ 
            error: 'Server Error'
        })
    }
};

module.exports = { createContact, allContacts }