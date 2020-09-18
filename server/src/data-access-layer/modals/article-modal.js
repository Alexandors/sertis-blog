const mongoose = require("mongoose");

const articleModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    status: String,
    content: String,
    categories: [String],
    authorId: mongoose.Types.ObjectId,
    lastModified: Date
})

module.exports = mongoose.model('article', articleModel);
