const item = require("../models/items.model.js");
module.exports = {
    getAllName:(req, res,next) => {
        item.getAllName((result) => {
            res.send(result);
        });
    },
    getById: (req, res) => {
        const id = req.params.id;
        item.getById(id, (result) => {
            res.json(result);
        });
    },
    insert: (req,res)=>{
        const form = JSON.parse(req.body);
        // let a = body;
        const item = {
            name : form.name,
            price: form.price,
            description: form.description,
            image: form.image,
        }
        // console.log(user);   
        item.insert(item, (result) => {
            res.json(result);    
        });
    },
    delete:(req,res)=>{
        const id = req.params.id;
        item.delete(id, (result) => {
            res.json(result);
        });
    },
    update:(req,res)=>{
        const form = JSON.parse(req.body);
        const item = {
            name : form.name,
            price: form.price,
            description: form.description,
            image: form.image,
        }
        item.update(item, (result) => {
            res.json(result);
        });
    }
}