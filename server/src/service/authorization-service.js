const userService = require('./user-service');
const securityService = require('./security-service');
const _ = require('lodash');

exports.login = async ({ username, password }) => {
    const user = await userService.getUserByUsername(username);
    if (_.isNil(user)) {
        return null;
    }
    const isAuth = securityService.comparePassword(password, user.password)
    return isAuth;
}
