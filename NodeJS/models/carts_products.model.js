const db = require("../common/connectDB");
const {UrlItems} = require("../common/handleSQL");
const Carts_Products = (carts_products) => {

}
Carts_Products.getAll = async (callback) => {
    const query = `SELECT * FROM carts_products JOIN items ON carts_products.id_item = items.id_item`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(result);
    });
}
Carts_Products.getById = async (id,callback) => {
    const query = `SELECT
    carts_products.id_itemcart ,
    items.name, 
  carts_products.received,
  carts_products.end,  
    items.image,
  items.price,
  carts_products.quantity, 
  carts_products.total
  FROM carts_products JOIN items ON carts_products.id_item = items.id_item WHERE cart_id = ?
  GROUP BY 
  carts_products.cart_id, 
  carts_products.end, 
  carts_products.received, 
  items.name;`;
    db.query(query,id, (err, result) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        result.map(product => {
            return(product.image =  UrlItems(product.image));
        });
        const withoutCartId = result.map(({ cart_id, ...rest }) => rest);
        console.log(withoutCartId);
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
    // console.log(carts_products);
    const query = `INSERT INTO carts_products SET ? ON DUPLICATE KEY UPDATE quantity = quantity + value(quantity),total = total + value(total);`;
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
    const query = `UPDATE carts_products SET ? ON DUPLICATE KEY UPDATE quantity = quantity + value(quantity),total = total + value(total) WHERE id = ?`;
    db.query(query, [carts_products,carts_products.id], (err, result) => {
        if (err) {
            return callback(false);
        }
        return callback(carts_products);
    });
}
Carts_Products.delete = async (carts_products, callback) => {
    const query = `DELETE FROM carts_products WHERE id_itemcart = ?`;
    db.query(query, carts_products.id, (err, result) => {
        if (err) {
            return callback(false);
        }
        return callback(true);
    });
}
Carts_Products.complete = async (items, callback) => {
    const query = `UPDATE users SET cart_id=? WHERE users.UID=?;`
    const query2 = `UPDATE cartsforuid SET cart_id=? WHERE cartsforuid.UID=?;`
    console.log(query);
    db.query(query,[items.cart_id, items.UID], (err, result) => {
        if (err) {
            return callback(false);
        }
        else{
            db.query(query2,[items.cart_id, items.UID], (err, result_temp) => {
                if (err) {
                    return callback(false);
                }
                console.log(result);
                return callback(result);
            });
        }
    });
}
module.exports = Carts_Products;