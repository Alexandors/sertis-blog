const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    role: String,
})

module.exports = mongoose.model('user', userModel);
