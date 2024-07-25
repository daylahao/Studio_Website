const carts_products = require("../models/carts_products.model.js");
const {validateToken} = require("../common/hashPassword");
const itemproducts = require("../models/items.model");
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
module.exports = {
    getAll: (req, res) => {
        carts_products.getAll((result) => {
            res.json(result);
        });
    },
    getById: async (req, res) => {
        await validateToken(req, (result) => {
            id = result.cart_id;
            if(id === null){
                res.status(403).json({message: "Invalid Token"});
                return;
            }else{
            carts_products.getById(id, (result) => {
                res.json(result);
            });
            }
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
        validateToken(req, (result) => { 
            const item = {
                cart_id : result.cart_id,
                UID : result.UID,
                id_item : form.id_item ,
                received:form.received,
                end:form.end,
                quantity: form.quantity,
                total: form.total,
            }
            // console.log(user);   
            carts_products.insert(item, (result) => {
                if(result === 401){
                    res.status(401).json({message: "Error"});
                    return;
                }else{
                    res.status(201).json(result);
                    return;
                }
            });
        });
    },
    delete:(req,res)=>{
        const body = JSON.parse(req.body);
        console.log(body.id);
        validateToken(req, (result) => {
            const item = {
                cart_id : result.cart_id,
                id_item: body.id
            }
            carts_products.delete(item, (result) => {
                res.json(result);
            });
         });

    },
    update:(req,res)=>{
        const body = JSON.parse(req.body);
        validateToken(req, (result) => {
        if(result==null){
            res.status(401).json(false);
        }else{
        const item = {
            cart_id : result.cart_id,
            UID : result.UID,
            id_item : body.id_item,
            received:body.received,
            end:body.end,
            quantity: body.quantity,
            total: body.total,
        }
        console.log(item);
        carts_products.update(item, (result) => {
            res.status(200).json(result);
        });
    }
    });
    }
}