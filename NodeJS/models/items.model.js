const db = require("../common/connectDB");
const Item = (item) => {

}
Item.getAllName = async (callback) => {
    const query = `SELECT * FROM items`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(result);
    });
}
Item.getById = async (id,callback) => {
    const query = `SELECT * FROM items WHERE id = ?`;
    db.query(query, id, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
            
        }
        callback(result);
    });
}
Item.insert = async (item, callback) => {
    const query = `INSERT INTO items SET ?`;
    db.query(query, item, (err, result) => {
        if (err) {
            throw err;
        }
        // console.log(result);
        const id = result.insertId;
        callback(item);
    });
}
Item.update = async (item, callback) => {
    const query = `UPDATE items SET ? WHERE IID = ?`;
    db.query(query, [item, item.IID], (err, result) => {
        if (err) {
            throw err;
        }
        callback(item);
    });
}
Item.delete = async (id, callback) => {
    const query = `DELETE FROM items WHERE IID = ?`;
    db.query(query, id, (err, result) => {
        if (err) {
            throw err;
        }
        callback(result);
    });
}
module.exports = Item;