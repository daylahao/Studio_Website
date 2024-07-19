const db = require("../common/connectDB");
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

