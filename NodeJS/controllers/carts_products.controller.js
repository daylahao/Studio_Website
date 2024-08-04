const carts_products = require("../models/carts_products.model.js");
const {validateToken} = require("../common/hashPassword");
const {Generate_Carts_Id} = require("../common/handleSQL")

const itemproducts = require("../models/items.model");
const moment = require('moment-timezone');

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
            if(result==null){
                return res.status(401).json({message: "Invalid Token"});
            }else{
            const item = {
                cart_id : result.cart_id,
                UID : result.UID,
                id_item : form.id_item ,
                received:moment(form.received).tz('Asia/Bangkok').format(),
                end:moment(form.end).tz('Asia/Bangkok').format(),
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
            });}
        });
    },
    delete:(req,res)=>{
        const body = JSON.parse(req.body);
        console.log(body.id);
            const item = {
                id: body.id_itemcart}
            carts_products.delete(item, (result) => {
                res.json(result);})
    },
    update:(req,res)=>{
        const body = JSON.parse(req.body);
        validateToken(req, (result) => {
        if(result==null){
            res.status(401).json(false);
        }else{
        const item = {
            id: body.id,
            received:moment(body.received).tz('Asia/Bangkok').format(),
            end:moment(body.end).tz('Asia/Bangkok').format(),
            quantity: body.total_quantity,
            total: body.total,
        }
        console.log(item);
        carts_products.update(item, (result) => {
            res.status(200).json(result);
        });
    }
    });
    },
    complete:(req,res)=>{
        validateToken(req, (result) => {
        if(result==null){
            res.status(401).json(false);
        }else{
        const item = {
            UID: result.UID,
            cart_id: Generate_Carts_Id(),
        }
        carts_products.complete(item, (result) => {
            console.log(item.cart_id);
            res.status(200).json(item.cart_id);
        });
    }})
}
}