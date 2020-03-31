const mongoose = require("mongoose");

const User = mongoose.model(
    "users",
    new mongoose.Schema({
        name: String,
        email: String,
        games: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "games"
            }
        ]
    })
)

module.exports = User;