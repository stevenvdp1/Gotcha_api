const mongoose = require("mongoose");

const Game = mongoose.model(
    "game",
    new mongoose.Schema({
        name:String,
        users:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ]
    })
)

module.exports = Game