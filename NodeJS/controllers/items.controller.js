const item = require("../models/items.model.js");
const uploadItems = require("../common/handlefiles").uploadItems;
require('dotenv').config();
const filenamedefault = "default.jpg";
module.exports = {
    getAllName:(req, res,next) => {
        item.getAllName(req,(result) => {
            res.json(result);
        });
    },
    getById: (req, res) => {
        const id = req.params.id;
        console.log(id);
        item.getById(id, (result) => {
            res.json(result);
        });
    },
    getAllType:(req,res)=> {
        item.getAllType((result) => {
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
        let filename = filenamedefault;
        if(req.file){
            filename = req.file.filename;
        }
        // console.log(uploadedFilePath);
        // let a = body;

        const item_ = {
            name : form.name,
            price: form.price,
            description: form.description,
            type: form.type,
            image: filename,
        }
        console.log(item_);   
        item.insert(item_, (result) => {
            res.json(result);
        });
    },
    delete:(req,res)=>{
        const body =  JSON.parse(req.body);
        // console.log(req.body)
        item.delete(body, (result) => {
            if(result==true)
            res.status(200).json(result);
            else{
            res.status(401).json(result);
            }
        });
    },
    update:(req,res)=>{
        const {image,...body} = req.body;
        console.log(body);
        console.log(req.file);
        const id = req.params.id;
        body['id_item']=id;
        if(req.file){
            body['image']=req.file.filename;
        }
        // console.log(body);
        // const item_ = {
        //     id:id,
        //     change:body
        // }
        console.log(body);
        item.update(body, (result) => {
            if(!result){
                res.status(401).json(result);
            }
            res.status(201).json(result);
        });
    }
}