const db = require("../common/connectDB");
const InsertCartIDTable = require("../common/queryDB").InsertCartIDTable;
const jwt = require("jsonwebtoken");
const { UrlAvatar } = require("../common/handleSQL");
const moment = require("moment-timezone");

require("dotenv").config();
const User = (user) => {};
User.getAllName = async (callback) => {
  const query = `SELECT * FROM users`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    const usersWithoutPassword = result.map(
      ({ password, token, ...rest }) => rest
    );
    const users = usersWithoutPassword.map((user) => {
      user.avt = UrlAvatar(user.avt);
      return user;
    });
    callback(usersWithoutPassword);
  });
};
User.getById = async (id, callback) => {
  const query = `SELECT * FROM users WHERE UID = ?`;
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    // console.log(result);
    result[0].avt = UrlAvatar(result[0].avt);
    result[0].birthday = moment(result[0].birthday).tz("Asia/Bangkok").format();
    const { password, token, ...userWithoutPass } = result[0];
    // console.log(userWithoutPass);
    callback(userWithoutPass);
  });
};
User.login = async (user, callback) => {
  const query = `SELECT * FROM users WHERE email = ? OR name = ? AND password = ?`;
  db.query(query, [user.name, user.name, user.password], (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
      return callback(false);
    } else if (result.length > 0 && result[0].password == user.password) {
      // Validate User Here
      // Then generate JWT Token
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = { ...result[0] };
      const token = jwt.sign(data, jwtSecretKey);
      result[0].avt = UrlAvatar(result[0].avt);
      const { password, ...userWithoutPass } = result[0];
      return callback({ status: 200, auth: token, user: userWithoutPass });
    } else {
      return callback(false);
    }
  });
};

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
  db.query(
    query_1,
    [user.name, user.name, user.email, user.email],
    (err, result) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      if (result[0].name_exists != null) {
        return callback({ status: 401, ...result[0] });
      }
      if (result[0].email_exists != null) {
        return callback({ status: 401, ...result[0] });
      }
      if (result[0].name_exists == null && result[0].email_exists == null) {
        const query = `INSERT INTO users SET ?`;
        db.query(query, user, (err, result) => {
          if (err) {
            throw err;
          } else {
            InsertCartIDTable(user.cart_id, result.insertId).then((result) => {
              if (result) {
                return callback(user);
              } else {
                // console.log(result);
                const id = result.insertId;
                return callback(user);
              }
            });
          }
        });
      }
    }
  );
};
User.update = async (user, callback) => {
  const query = `UPDATE users SET ? WHERE UID = ?`;
  db.query(query, [user.change, user.UID], (err, result) => {
    if (err) {
      return callback(false);
    }
    if (result.affectedRows) return callback(true);
    else {
      return callback(false);
    }
  });
};
User.delete = async (id, callback) => {
  const query = `DELETE FROM users WHERE UID = ?`;
  db.query(query, id, (err, result) => {
    if (err) {
      callback(false);
    }
    callback(true);
  });
};
User.Insert_EmailNotify = async (email, callback) => {
  const query = `INSERT INTO email_notify SET ?`;
  console.log(email);
  db.query(query, email, (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
      return callback(false);
    }
    if (result.affectedRows) {
      return callback(true);
    } else {
      return callback(false);
    }
  });
};
module.exports = User;
