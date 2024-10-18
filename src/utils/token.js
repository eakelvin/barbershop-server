const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_SECRET
const environment = process.env.NODE_ENV

const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId }, 
        jwtKey, 
        {expiresIn: '1h'}
    )

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: environment !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 60 * 60 * 1000
    })
}


module.exports = generateToken