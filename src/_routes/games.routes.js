const express = require('express')
const router = express.Router()
const gamesController = require('../_controllers/games.controls')
const { authenticate } = require('../_middleware/authentication')
const { validate, game_validator } = require('../_middleware/validators')

router.route('/')
    .get(authenticate, gamesController.get_games)
    .post(authenticate, game_validator, validate, gamesController.create_game)

router.delete('/:gameId', authenticate, gamesController.delete_game)

router.patch('/:gameId/join', authenticate, gamesController.join_game)

router.patch('/:gameId/leave', authenticate, gamesController.leave_game)

module.exports = router