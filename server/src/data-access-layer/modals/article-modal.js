const mongoose = require("mongoose");

const articleModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    status: String,
    content: String,
    category: String,
    authorId: mongoose.Types.ObjectId,
    lastModified: Date
})

module.exports = mongoose.model('article', articleModel);
