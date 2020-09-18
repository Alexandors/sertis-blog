const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const _ = require('lodash');

const algorithm = 'aes-256-ctr'
const password_key = "wRyGPyAU8pmdNKv6rgfeFAVpuRVkzzdL";
const saltRounds = 12;

const jwtSignKey = '85b43cdc6dd3c5cacc3784f05494e7afbba048e3beabf8021bbcdf7d0931549d';

exports.encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, password_key)
    const crypted =  cipher.update(text, 'utf8', 'hex');
    return crypted + cipher.final('hex')
}

exports.cryptPassword = function(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password+'', salt);
};

exports.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password+'', hash);
};


exports.securityMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token,jwtSignKey, (err, data) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403)
        }
        req.securityContext = data;
        next();
    });
}

exports.jwtSign = ({ userId, userRole }) => {
    return jwt.sign({ userId, userRole }, jwtSignKey, { expiresIn: '1d'});
}
