const connect = require('./connectDB');
const InsertCartIDTable = (cartID,userID) => {
    return new Promise((resolve,reject) => {
        console.log(cartID,userID);
        const query = `INSERT INTO cartsforuid (cart_id,UID) VALUES ('${cartID}',${userID})`;
        connect.query(query,(err,result) => {
            if(err) return resolve(false);
            resolve(true);
        })
    })
}
module.exports = {
    InsertCartIDTable
}