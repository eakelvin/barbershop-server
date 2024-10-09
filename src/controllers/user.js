const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../utils/token')

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    console.log(req.body);
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        const user = await User.create({
            name, 
            email, 
            password, 
        })
        if (user) {
            generateToken(res, user._id)
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            })
        } else {
            res.status(400)
            throw new Error('Invalid User Details')
        }
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logout Successful!'})
})

module.exports = { login, register, logout }