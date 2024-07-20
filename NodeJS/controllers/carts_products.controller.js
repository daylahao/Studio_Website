const carts_products = require("../models/carts_products.model.js");
module.exports = {
    getAll: (req, res) => {
        carts_products.getAll((result) => {
            res.json(result);
        });
    },
    getById: (req, res) => {
        const id = req.params.id;
        carts_products.getById(id, (result) => {
            res.json(result);
        });
    },
    getByUID: (req, res) => {
        const id = req.params.id;
        carts_products.getByUID(id, (result) => {
            res.json(result);
        });
    },
    insert: (req,res)=>{
        const form = JSON.parse(req.body);
        // let a = body;
        const item = {
            cart_id : form.cart_id,
            UID : form.UID,
            id_item : form.id_item ,
            received:form.received,
            end:form.end,
            quantity: form.quantity,
            price: form.price,
        }
        // console.log(user);   
        carts_products.insert(item, (result) => {
            res.json(result);    
        });
    },
    delete:(req,res)=>{
        const id = req.params.id;
        carts_products.delete(id, (result) => {
            res.json(result);
        });
    },
    update:(req,res)=>{
        const form = JSON.parse(req.body);
        const item = {
            cart_id : form.cart_id,
            UID : form.UID,
            id_item : form.id_item ,
            received:form.received,
            end:form.end,
            quantity: form.quantity,
            price: form.price,
        }
        carts_products.update(item, (result) => {
            res.json(result);
        });
    }
}