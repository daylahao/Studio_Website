const db = require("../common/connectDB");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = (user) => {

}
User.getAllName = async (callback) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        const usersWithoutPassword = result.map(({ password,token, ...rest }) => rest);
        callback(usersWithoutPassword);
    });
}
User.getById = async (id,callback) => {
    const query = `SELECT * FROM users WHERE UID = ?`;
    db.query(query, id, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        const { password,token,role, ...userWithoutPass } = result[0];
        callback(userWithoutPass);
    });
}
User.login = async (user, callback) => {
    const query = `SELECT * FROM users WHERE email = ? OR name LIKE CONCAT('%', CONVERT(?, BINARY)) AND password = ?`;
    db.query(query, [user.email,user.name, user.password], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        else if(result.length> 0){
        // Validate User Here
        // Then generate JWT Token
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        let data = {...result[0]};
        const token = jwt.sign(data, jwtSecretKey);
        return callback({status:200,auth:token,user:result[0]});
        }else{
            return callback({status:401,auth:null,user:null});
        }
    });
}

User.insert = async (user, callback) => {
    const query = `INSERT INTO users SET ?`;
    db.query(query, user, (err, result) => {
        if (err) {
            throw err;
        }
        // console.log(result);
        const id = result.insertId;
        callback(user);
    });
}
User.update = async (user, callback) => {
    const query = `UPDATE users SET ? WHERE UID = ?`;
    db.query(query, [user, user.UID], (err, result) => {
        if (err) {
            throw err;
        }
        callback(user);
    });
}
User.delete = async (id, callback) => {
    const query = `DELETE FROM users WHERE UID = ?`;
    db.query(query, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    });
}
module.exports = User;

