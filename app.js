const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const gamesRoutes = require('./src/_routes/games.routes')
const usersRoutes = require('./src/_routes/users.routes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/users', usersRoutes)
app.use('/games', gamesRoutes)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200)
    }
    next()
})

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;