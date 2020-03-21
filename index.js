//Exporess Config
const express = require('express')
const app = express()
const port = process.env.PORT || 1337

//MongoDb Config
const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017'
mongoose.connect(mongoUrl +'/Gotcha', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const Users = mongoose.model('users',{name:String})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (req, res) => {
    let users = Users.find((err, users)=>{
        if(err) console.log(err)
        return res.send(users)        
    })
})

app.listen(port, async () => {
    console.log(`Listening on port:${port}`)
})
