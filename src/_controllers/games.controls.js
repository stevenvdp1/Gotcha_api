const { validationResult } = require('express-validator');

const Game = require('../_models/game.model')

exports.create_game = (req, res, next) => {
    const newGame = new Game({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        creator: req.userData.id,
        players: [req.userData.id],
        creationDate: new Date().toISOString(),
    })
    Game.create(newGame, (err, game) => {
        if (err) return res.status(500).json({ error: err })
        res.status(201).json({ message: 'Game created' })
    })
}

exports.get_games = (req, res, next) => {
    Game.find()
        .select('_id name description startDate creator players')
        .populate('players')
        .exec((err, games) => {
            if (err) return res.status(500).json({ error: { message: err } })
            games = games.map(game => {
                return {
                    id: game._id,
                    name: game.name,
                    description: game.description,
                    startDate: game.startDate,
                    players: game.players.map(player => {
                        return {
                            id: player._id,
                            userName: player.userName,
                            isCreator: player._id.toString() === game.creator.toString()
                        }
                    }),
                    isCreator: game.creator.toString() === req.userData.id.toString()
                }
            })
            res.status(200).json(games)
        })
}

exports.join_game = (req, res, next) => {
    Game.findOneAndUpdate({ '_id': req.params.gameId, 'players': { '$ne': req.userData.id } }, { $push: { "players": req.userData.id } }, { new: true })
        .select('_id name description startDate creator players')
        .populate('players')
        .exec((err, game) => {
            if (err) return res.status(500).json({ error: { message: err } })
            if (!game) return res.status(400).json({ error: { message: 'Bad Request' } })
            game = {
                id: game._id,
                name: game.name,
                description: game.description,
                startDate: game.startDate,
                players: game.players.map(player => {
                    return {
                        id: player._id,
                        userName: player.userName,
                        isCreator: player._id.toString() === game.creator.toString()
                    }
                }),
                isCreator: game.creator.toString() === req.userData.id.toString()
            }
            res.status(200).json(game)
        })
}

exports.leave_game = (req, res, next) => {
    Game.findOneAndUpdate({ '_id': req.params.gameId, 'players': { '$in': [req.userData.id] } }, { $pull: { 'players': req.userData.id } }, { new: true })
        .select('_id name description startDate creator players')
        .populate('players')
        .exec((err, game) => {
            if (err) return res.status(500).json({ error: { message: err } })
            if (!game) return res.status(400).json({ error: { message: 'Bad Request' } })
            game = {
                id: game._id,
                name: game.name,
                description: game.description,
                startDate: game.startDate,
                players: game.players.map(player => {
                    return {
                        id: player._id,
                        userName: player.userName,
                        isCreator: player._id.toString() === game.creator.toString()
                    }
                }),
                isCreator: game.creator.toString() === req.userData.id.toString()
            }
            res.status(200).json(game)
        })
}

exports.delete_game = (req, res, next) => {
    Game.findOneAndDelete({ "_id": req.params.gameId, "creator": req.userData.id }, (err, game) => {
        if (err) return res.status(500).json({ error: { message: err } })
        if (!game) return res.status(400).json({ error: { message: 'Bad Request' } })
        res.status(202).json({ message: 'Game deleted' })
    })
}