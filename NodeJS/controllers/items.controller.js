const item = require("../models/items.model.js");
const uploadItems = require("../common/handlefiles").uploadItems;
require('dotenv').config();
const filenamedefault = "default.jpg";
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
    getByType: (req,res)=>{
        const type = req.params.type;
        item.getByType(type, (result) => {
            res.json(result);
        });
    },
    insert: (req,res)=>{
        const form = req.body;
        const filename = filenamedefault;
        if(req.file){
            filename = req.file.filename;
        }
        // console.log(uploadedFilePath);
        // let a = body;

        const item_ = {
            name : form.name,
            price: form.price,
            description: form.description,
            image: filename,
        }
        // console.log(user);   
        item.insert(item_, (result) => {
            res.json(result);
        });
    },
    delete:(req,res)=>{
        const body =  JSON.parse(req.body);
        // console.log(req.body)
        item.delete(body.id, (result) => {
            if(result)
            res.status(200).json(result);
            else{
            res.status(401).json(result);
            }
        });
    },
    update:(req,res)=>{
        const {image_,...body} = req.body;
        const id = req.params.id;
        const image = req.file;
        if(image_){
            body['image']=image_;
        }else if(image){
            body['image']=image.filename;
        }
        const item_ = {
            id:id,
            change:body
        }
        item.update(item_, (result) => {
            if(!result){
                res.status(401).json(result);
            }
            res.status(201).json(result);
        });
    }
}