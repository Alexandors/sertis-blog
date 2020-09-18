const userModal = require('../data-access-layer/modals/user-modal');
const mongoose = require("mongoose");
const securityService = require('./security-service')
const _ = require("lodash");

exports.createUser = async ({username, password}) => {
    if(_.isNil(username)) {
        throw 'Username is required.'
    }
    if(_.isNil(password)) {
        throw 'Password is required.'
    }
    const existUser = await this.getUserByUsername(username);
    if (!_.isNil(existUser)) {
        throw 'Username '+username+ ' already exist.'
    }
    try {
        const newUser = new userModal({
            _id: mongoose.Types.ObjectId(),
            username,
            password: securityService.cryptPassword(password)
        });
        return await newUser.save();
    } catch (ex) {
        console.error(ex)
    }
}

exports.updateUser = async ({ _id, password }) => {
    if(_.isNil(_id)) {
        throw '_id is required.'
    }

    if(_.isNil(password)) {
        throw 'Password is required.'
    }

    const user = await userModal.where({_id}).findOne();

    if (_.isNil(user)) {
        throw 'User ID: ' + _id + ' not found.'
    }

    return await userModal.update({_id}, {$set: {password: securityService.cryptPassword(password)}});
}

exports.getUser = async (id) => {
    return userModal.findById(id);
}

exports.getUserByUsername = async (username) => {
    return await userModal.where({username}).findOne();
}

exports.getUserInfoByUsername = async (username) => {
    const user = await this.getUserByUsername(username)
    _.set(user, 'password', null);
    return user;
}

