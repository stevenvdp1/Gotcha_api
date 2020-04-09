const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    refreshTokens: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = mongoose.model("User", userSchema);