const express = require('express')
const router = express.Router()

const { 
    login, 
    register, 
    logout, 
    users  
} = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/users', users)

module.exports = router