const articleModel = require('../data-access-layer/modals/article-modal');
const userService = require('../service/user-service');
const moment = require('moment');
const mongoose = require("mongoose");
const constants = require('../common/constants');
const _ = require('lodash');

exports.createArticle = async ({name, content, authorId, status, category}) => {
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
            category,
            status: getArticleStatus(status),
            authorId: author._id,
            lastModified: moment.utc()
        });

        return await newArticle.save()
    } catch (ex) {
        console.error(ex)
    }
}

exports.updateArticle = async ({_id, name, content, authorId, status, category}) => {
    const existArticle = await this.getArticleById(_id);

    console.log(existArticle.authorId, authorId)
    if (existArticle.authorId != authorId) {
        throw "You don't have permission to update this article";
    }

    if (_.isEmpty(name)) {
        throw "Name is required";
    }

    try {
      await articleModel.update({_id}, {$set: {
          name,
          content,
          status: getArticleStatus(status),
          category,
          lastModified: moment.utc()
      }});
    } catch (ex) {
        console.error(ex)
    }
}

exports.getArticles = async ({page, size}) => {
    const skip = (parseInt(page)) * parseInt(size);
    const articles = await articleModel.find({}).sort({lastModified: -1}).limit(size).skip(skip);
    const userIds = _.uniq(_.map(articles, "authorId"))
    const userList = [];
    for (let i=0; i<userIds.length;i++) {
        userList[userIds[i]] = await userService.getUserInfoById(userIds[i]);
    }

    return _.map(articles, article => {
        return assembleAritle(article, userList[article.authorId])
    })
}

exports.getArticleById = async (id) => {
    const article = await articleModel.where({_id: id}).findOne();
    const user = await userService.getUserInfoById(article.authorId);

    return assembleAritle(article, user)
}

exports.getArticleCategories = async () => {
    return ['Science', 'Physics', 'Technology'];
}

const assembleAritle = (article, user) => {
    const {_doc} = article;
    return {..._doc, author: user}
}

const getArticleStatus = (status) => {
    if (!_.isNil(constants.ArticleStatus[status])) {
        return status;
    }
    return constants.ArticleStatus.Draft;
}
