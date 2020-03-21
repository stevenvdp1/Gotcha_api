//Exporess Config
const express = require('express')
const app = express()
const port = process.env.PORT || 1337

//MongoDb Config
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
mongoose.connect(mongoUrl +'/Gotcha', { useNewUrlParser: true, useUnifiedTopology: true })
.then(
    () => console.log('Connected to Database'),
    (err) => console.log('Error while connection to Database', err)
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const collections = require('./src/_models')



app.get('/users', (req, res) => {
    collections.User.find((err, users)=>{
        if(err) console.log(err)
        return res.send(users)        
    })
})

app.get('/games', (req, res) => {
    collections.Game.find((err, games)=>{
        if(err) console.log(err)
        return res.send(games)        
    })
})


app.listen(port, async () => {
    console.log(`Listening on port:${port}`)
})
