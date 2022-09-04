
const jwt = require('jsonwebtoken');
const User = require('../models/user')

// Checks if user is authenticated or not
const isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return res.json({message :'Login first to access this functionality.'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
}

// Handling users roles

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.json({message :  `Role (${req.user.role}) is not allowed to acccess this resource`})
             
        }
        next()
    }
}

module.exports = {isAuthenticatedUser, authorizeRoles}