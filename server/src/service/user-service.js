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

exports.getUser = async (id) => {
    return userModal.findById(id);
}

exports.getUserByUsername = async (username) => {
    return await userModal.where({username}).findOne();
}
