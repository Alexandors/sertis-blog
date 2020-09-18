const userService = require('./user-service');
const securityService = require('./security-service');
const _ = require('lodash');

exports.login = async ({ username, password }) => {
    try {
        const user = await userService.getUserByUsername(username);
        if (_.isNil(user)) {
            console.log('User ' + username + ' not found.');
            return null;
        }
        console.log(password, user.password)
        const isAuth = securityService.comparePassword(password, user.password);
        console.log('User ' + username + ' authorized: '+isAuth);
        if (isAuth === true) {
            return {
                token: securityService.jwtSign({userId: user._id, userRole: user.role})
            };
        }
    } catch (ex) {
        console.error(ex);
    }

    return null;
}

