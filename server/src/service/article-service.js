const articleModel = require('../data-access-layer/modals/article-modal');
const userService = require('../service/user-service');
const _ = require("lodash");
const moment = require('moment');
const mongoose = require("mongoose");

exports.createArticle = async ({name, content, authorId}) => {
    if (_.isEmpty(name)) {
        throw "Name is required";
    }

    let author = null;
    try {
        author = await userService.getUser(authorId);
    } catch (ex) {
        console.error(ex);
    }

    if (_.isNil(author)) {
        throw "Author not found."
    }

    try {
        const newArticle = new articleModel({
            _id: mongoose.Types.ObjectId(),
            name,
            content,
            authorId: author._id,
            lastModified: moment.utc()
        });

        return await newArticle.save()
    } catch (ex) {
        console.error(ex)
    }


}

exports.getArticles = async ({page, size}) => {
    const skip = (parseInt(page)) * parseInt(size);
    return articleModel.find({}).sort({lastModified: -1}).limit(size).skip(skip);
}
