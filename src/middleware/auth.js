const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const jwtKey = process.env.JWT_SECRET

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt
    if (token) {
        // console.log("Token received:", token);
        // console.log('Current Server Time:', new Date());
        try {
            const decoded = jwt.verify(token, jwtKey)
            // console.log('Token Expiry Time:', new Date(decoded.exp * 1000));
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, Invalid Token')
        }
    } else {
        res.status(401)
        throw new Error('Not Authorized, no token')
    }
})

module.exports = { protect }