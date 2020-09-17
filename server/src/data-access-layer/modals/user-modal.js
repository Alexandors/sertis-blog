const mongoose = require("mongoose");

const userModal = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String
})

module.exports = mongoose.model('user', userModal);
