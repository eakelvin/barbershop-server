const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../utils/token')
const environment = process.env.NODE_ENV

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // console.log(req.body);
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
    // console.log(req.body);
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
        secure: environment === 'development',
        sameSite: "none",
        expires: new Date(0)
    })
    res.status(200).json({ 
        message: 'Logout Successful!'
    })
})

const getUser = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user)
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const users = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ 
            error: 'Server Error'
        })
    }

})

module.exports = { 
    login, register, logout, users, getUser, updateUser 
}