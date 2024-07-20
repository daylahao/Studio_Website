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
        // console.log(userWithoutPass);
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
        const { password,role, ...userWithoutPass } = result[0];
        return callback({status:200,auth:token,user:userWithoutPass});
        }else{
            return callback({status:401,auth:null,user:null});
        }
    });
}

User.insert = async (user, callback) => {
    const query_1 = `SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM users WHERE UPPER(name) LIKE CONCAT('%', CONVERT(UPPER(?), BINARY))) THEN ?
        ELSE NULL
    END AS name_exists,
    CASE 
        WHEN EXISTS (SELECT 1 FROM users WHERE email = ?) THEN ?
        ELSE NULL
    END AS email_exists
FROM dual;`;
    db.query(query_1, [user.name,user.name,user.email,user.email], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        if(result[0].name_exists != null){
            return callback({status:401,...result[0]});
        }
        if(result[0].email_exists != null){
            return callback({status:401,...result[0]});
        }
        if(result[0].name_exists == null && result[0].email_exists == null){
            const query = `INSERT INTO users SET ?`;
            db.query(query, user, (err, result) => {
                if (err) {
                    throw err;
                }
                // console.log(result);
                const id = result.insertId;
                return callback(user);
            });
        }
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

