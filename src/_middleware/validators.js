const { check } = require('express-validator');
const { validationResult } = require('express-validator');

exports.password_validator = [
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),

    check('password')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,10}$/)
        .withMessage('Password requires a minimum of eight characters, at least one letter and one number')
        .custom((value, { req }) => {
            console.log(value)
            if (value !== req.body.confirmPassword) {
                throw new Error('Passwords don\'t match');
            } else {
                return value;
            }
        }),

    check('userName')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 25 })
        .withMessage('Name needs to be 3-25 characters long')
        .matches('^[a-zA-Z0-9]+$')
        .withMessage('Name can only contain letters and numbers'),

]

exports.game_validator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 255 })
        .withMessage('Name needs to be 3-255 characters long')
        .matches('^[a-zA-Z0-9 _]*$')
        .withMessage('Name can only contain letters, numbers and spaces'),

    check('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 3, max: 255 })
        .withMessage('Description needs to be 3-255 characters long')
        .matches('^[a-zA-Z0-9 _]*$')
        .withMessage('Description can only contain letters, numbers and spaces'),

    check('startDate')
        .notEmpty()
        .withMessage('Start date is required')
        .isISO8601()
        .withMessage('Start date needs to be in ISO format')
        .isAfter(new Date().toJSON())
        .withMessage('Start date has to be in the future')
        .isBefore(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toJSON())
        .withMessage('Start date can be max 1 year from now')
]

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    return res.status(409).json({ error: { errors: errors.errors } })
}