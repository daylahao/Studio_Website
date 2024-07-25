const db = require("../common/connectDB");
const Carts_Products = (carts_products) => {

}
Carts_Products.getAll = async (callback) => {
    const query = `SELECT * FROM carts_products`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(result);
    });
}
Carts_Products.getById = async (id,callback) => {
    const query = `SELECT * FROM carts_products WHERE cart_id = ?`;
    db.query(query,id, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        const withoutCartId = result.map(({ cart_id, ...rest }) => rest);
        callback(withoutCartId);
    });
}
Carts_Products.getByUID = async (UID,callback) => {
    const query = `SELECT * FROM carts_products INNER JOIN items ON carts_products.id_item = items.id WHERE UID = ?`;
    db.query(query,UID,(err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(result);
    });
}
Carts_Products.insert = async (carts_products, callback) => {
    const query = `INSERT INTO carts_products SET ?`;
    db.query(query, carts_products, (err, result) => {
        if (err) {
            return callback(401);
            // throw err;
        }
        // console.log(result);
        const id = result.insertId;
        return callback(carts_products);
    });
}
Carts_Products.update = async (carts_products, callback) => {
    const query = `UPDATE carts_products SET ? WHERE cart_id = ? AND id_item = ?`;
    db.query(query, [carts_products,carts_products.cart_id,carts_products.id_item], (err, result) => {
        if (err) {
            return callback(false);
        }
        return callback(carts_products);
    });
}
Carts_Products.delete = async (carts_products, callback) => {
    const query = `DELETE FROM carts_products WHERE cart_id = ? AND id_item = ?`;
    db.query(query, [carts_products.cart_id,carts_products.id_item], (err, result) => {
        if (err) {
            return callback(false);
        }
        return callback(true);
    });
}
module.exports = Carts_Products;