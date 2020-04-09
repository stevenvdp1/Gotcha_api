const express = require('express')
const router = express.Router()
const usersController = require('../_controllers/users.control')
const { authenticate, validate_refresh_token } = require('../_middleware/authentication')
const { validate, password_validator } = require('../_middleware/validators')

router.post('/signup', password_validator, validate, usersController.signup_user)

router.post('/login', usersController.login_user)

router.delete('/:userId', authenticate, usersController.delete_user)

module.exports = router