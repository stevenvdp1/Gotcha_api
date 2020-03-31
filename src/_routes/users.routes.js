const express = require('express')
const router = express.Router()

const Users = require('../_models/user.model')

//Get all
router.get('/', (req, res, next) => {
    Users.find()
        .select('name')
        .exec((err, users) => {
            if (err) res.sendStatus(404)
            res.send(users)
        })
})

//Create new User
router.post('/', (req, res) => {
    Users.create(req.body, (err, user) => {
        res.status(201).send(user)
    })
})

//Get by ID
router.get('/:id', (req, res) => {
    Users.findById(req.params.id)
        .select('name games')
        .populate('games', 'name')
        .exec((err, users) => {
            if (err) res.sendStatus(404)
            res.send(users)
        })
})

//Delete user by ID
router.delete('/:id', (req, res) => {
    Users.findByIdAndDelete(req.params.id, (err) => {
        res.sendStatus(204)
    })
})

//Update user by ID
router.put('/:id', (req, res) => {
    Users.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false }, (err, user) => {
        res.send(user)
    })
})

module.exports = router