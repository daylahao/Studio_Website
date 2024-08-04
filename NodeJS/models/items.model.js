const db = require("../common/connectDB");
const UrlItems = require("../common/handleSQL").UrlItems;
require('dotenv').config();
const Item = (item) => {

}
Item.getAllName = async (req,callback) => {
    let keysearch = req.query.search;
    let Total_Item = 0;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let query = `SELECT * FROM items JOIN items_type ON items.type = items_type.id;`;
    if(keysearch){
        keysearch = keysearch.replace(/\s+/g, '');
        query = `SELECT *
FROM items
JOIN items_type ON items.type = items_type.id
WHERE REPLACE(items.name, ' ', '') LIKE '%${keysearch}%' OR REPLACE(items_type.type, ' ', '')  LIKE '%${keysearch}%';`;
    }
    if(limit){
        query = `SELECT * FROM items JOIN items_type ON items.type = items_type.id`;
        if(offset){
            query += ` LIMIT ${offset}, ${limit};`;
        }else{
            query += ` LIMIT ${limit};`;
        }
    }
    db.query("SELECT COUNT(*) AS Total_Item FROM items;", (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        Total_Item = result[0].Total_Item;
    });
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        result.map(product => {
            console.log(product);
            product.image =  UrlItems(product.image);
            return product;
        });
        let data = {Total_Item: Total_Item, data: result};
        console.log(data);
        callback(data);
    });
}
Item.getAllType = async (callback) => {
    const query = `SELECT * FROM items_type`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        console.log(result);
        return callback(result);
    });
}
Item.getById = async (id,callback) => {
    const query = `SELECT * FROM items JOIN items_type ON items.type = items_type.id WHERE id_item = ?;`;
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
    const query = `UPDATE items SET ? WHERE id_item = ?;`;
    db.query(query, [item, item.id_item], (err, result) => {
        console.log(result);
        if (err) {
            callback(false);
        }
        callback(item);
    });
}
Item.delete = async (id, callback) => {
    const query = `DELETE  FROM items WHERE id_item = ?;`;
    db.query(query, id.id, (err, result) => {
        if (err) {
            return callback(false);
        }
        callback(true);
    });
}
module.exports = Item;