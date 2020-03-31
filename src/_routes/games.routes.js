const express = require('express')
const router = express.Router()

const Games = require('../_models/game.model')


//GET all
router.get('/', (req, res, next) => {
    Games.find()
        .select('name')
        .exec((err, games) => {
            if (err) res.sendStatus(404)
            return res.send(games)
        })
})

//Get by ID
router.get('/:id', (req, res) => {
    Games.findById(req.params.id)
        .select('name users')
        .populate('users', 'name')
        .exec((err, games) => {
            if (err) res.sendStatus(404)
            return res.send(games)
        })
})

module.exports = router