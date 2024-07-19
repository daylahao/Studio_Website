const dotenv = require("dotenv");
const saltedSha256 = require('salted-sha256');
const hashPassword = (rawPass) => {
    return saltedSha256(rawPass, process.env.SALT_PASSWORD);
}
module.exports = hashPassword;