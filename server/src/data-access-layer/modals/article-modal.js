const mongoose = require("mongoose");

const articleModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    status: String,
    content: String,
    categories: [String],
    author: mongoose.Types.ObjectId,
    lastModified: Date
})

module.exports = mongoose.model('article', articleModel);
