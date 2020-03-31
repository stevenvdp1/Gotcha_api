const mongoose = require("mongoose");

const Game = mongoose.model(
    "games",
    new mongoose.Schema({
        name:String,
        users:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        ]
    })
)

module.exports = Game