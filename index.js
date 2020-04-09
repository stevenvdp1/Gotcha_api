const http = require('http')
const app = require('./app')

const port = process.env.PORT || 1337

const server = http.createServer(app)

server.listen(port)

const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'

//MongoDb Config
mongoose
    .connect(mongoUrl + '/Gotcha', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(()=>console.log('Connected to Database'))
    .catch(err=>console.log('Error while connection to Database', err))
