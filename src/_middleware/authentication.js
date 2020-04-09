const jwt = require('jsonwebtoken')
const jwt_access_key = process.env.JWT_ACCESS_KEY || 'access_secret'

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, jwt_access_key)
        req.userData = decoded
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Auth failed' })
    }
}

exports.generate_access_token = (user) => {
    return jwt.sign(
        {
            email: user.email,
            id: user._id
        },
        jwt_access_key,
        {
            expiresIn: '1h'
        }
    )

}

