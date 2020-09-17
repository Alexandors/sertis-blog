const crypto = require('crypto');
const bcrypt = require('bcrypt')

const algorithm = 'aes-256-ctr'
const password_key = "wRyGPyAU8pmdNKv6rgfeFAVpuRVkzzdL";
const saltRounds = 12;

// exports.encrypt = (text) => {
//     const cipher = crypto.createCipheriv(algorithm, password_key)
//     const crypted =  cipher.update(text, 'utf8', 'hex');
//     return crypted + cipher.final('hex')
// }

exports.cryptPassword = function(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password+'', salt);
};

exports.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password+'', hash);
};
