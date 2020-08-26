var bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const { generate_access_token } = require('../_middleware/authentication')

const User = require('../_models/user.model')

exports.signup_user = (req, res, next) => {
    User.findOne({ email: req.body.email.toLowerCase() })
        .exec((err, user) => {
            if (err) return res.status(500).json({ error: err })
            if (user) return res.status(409).json({ error: { message: 'Email address already in use' } })
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) return res.status(500).json({ error: err })
                const newUser = new User({
                    email: req.body.email,
                    password: hash,
                    userName: req.body.userName,
                    refreshTokens: []
                })
                User.create(newUser, (err, user) => {
                    if (err) return res.status(500).json({ error: err })
                    res.status(201).json({ message: 'User created' })
                })
            })
        })
}

exports.login_user = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email.toLowerCase()})
        .exec(async (err, user) => {
            if (err) return res.status(500).json({ error: err })
            if (!user) return res.status(401).json({ message: 'Auth failed' })
            let isValid = false
            if (req.body.password) {
                isValid = await bcrypt.compare(req.body.password, user.password)
            }
            else if (req.body.refreshToken) {
                for (let index = 0; index < user.refreshTokens.length; index++) {
                    if (await bcrypt.compare(req.body.refreshToken, user.refreshTokens[index])) {
                        isValid = true
                        user.refreshTokens.splice(index, 1)
                        break;
                    }
                }
            }
            if (!isValid) return res.status(401).json({ message: 'Auth failed' })
            const accessToken = generate_access_token(user)
            const refreshToken = uuidv4()
            bcrypt.hash(refreshToken, 10, async (err, hashedToken) => {
                if (err) return res.status(500).json({ error: err })
                user.refreshTokens.push(hashedToken)
                await user.save()
                res.status(200).json({ message: 'Auth successful', accessToken, refreshToken })
            })
        })
}

exports.delete_user = (req, res, next) => {
    const userId = req.userData.id
    if (userId != req.params.userId) return res.status(403).json({ message: 'Forbidden' })
    User.findByIdAndRemove(req.params.userId)
        .exec((err, user) => {
            if (err) return res.status(500).json({ error: err })
            res.status(200).json({ message: 'User deleted' })
        })
}