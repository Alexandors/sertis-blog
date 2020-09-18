const mongoose = require("mongoose");

const articleModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    status: String,
    content: String,
    authorId: mongoose.Types.ObjectId,
    lastModified: Date,
    category: String,
})

module.exports = mongoose.model('article', articleModel);
