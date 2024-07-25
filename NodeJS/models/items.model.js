const db = require("../common/connectDB");
const UrlItems = require("../common/handleSQL").UrlItems;
require('dotenv').config();
const Item = (item) => {

}
Item.getAllName = async (callback) => {
    const query = `SELECT * FROM items`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        result.map(product => {
            product.image =  UrlItems(product.image);
            return product;
        });
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
        result.map(product => {
            product.image =  UrlItems(product.image);
            return product;
        });
        callback(result);
    });
}
Item.getByType = async (type,callback) =>{
    const query = `SELECT * FROM items WHERE type = ?`;
    db.query(query, type, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        result.map(product => {
            product.image =  UrlItems(product.image);
            return product;
        });
        callback(result);
    });
}
Item.insert = async (item_, callback) => {
    const query = `INSERT INTO items SET ?`;
    db.query(query, item_, (err, result) => {
        if (err) {
            return callback(null);
            // throw err;
        }else
        // console.log(result);
        // const id = result.insertId;
        return callback(result);
    });
}
Item.update = async (item, callback) => {
    const query = `UPDATE items SET ? WHERE id = ?`;
    db.query(query, [item, item.id], (err, result) => {
        if (err) {
            callback(false);
        }
        callback(item);
    });
}
Item.delete = async (id, callback) => {
    const query = `DELETE FROM items WHERE id = ?`;
    db.query(query, id, (err, result) => {
        if (err) {
            return callback(false);
        }
        callback(true);
    });
}
module.exports = Item;