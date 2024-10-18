const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/auth')

const { 
    login, 
    register, 
    logout, 
    users, 
    getUser, 
    updateUser 
} = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/users', users)
router.route('/user').get(protect, getUser).put(protect, updateUser)

module.exports = router