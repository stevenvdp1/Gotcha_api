const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    startDate: {
        type: Date,
        required: true,
        min: new Date(),
        max: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    players: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    creationDate:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Game", gameSchema)