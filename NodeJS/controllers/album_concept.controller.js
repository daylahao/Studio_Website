const album = require("../models/album_concept.model.js");
const { getById } = require("../models/items.model.js");
require('dotenv').config();
module.exports={
    getAll: (req,res)=>{
        album.getAll(req,(result)=>{
            res.status(200).json(result);
        })
    },
    getById:(req,res)=>{
        const id = req.params.id;
        album.getById(id,(result)=>{
            if(result==false){
                res.status(401).json(result);
            }else{
                res.status(200).json(result);
            }
        });
    },
    getLimited:(req,res)=>{ 
        const limited = req.search;
        console.log(limited);
        // album.getLimited(limited,(result)=>{
        //     if(result==false){
        //         res.status(401).json(result);
        //     }else{
        //         res.status(200).json(result);
        //     }
        // });
    },
    insert:(req,res)=>{
        const images = req.files;
        const album_ = req.body;
        const Listname  = images.map(({filename})=>filename);
        album.insert(album_,Listname,(result)=>{
            if(!result){
                res.status(401).json(result)
            }else{
                res.status(200).json(result);
            }
        })
    },
    update:(req,res)=>{
        const {image_,...album_} = req.body;
        const Listname=[];
        album.update(album_,Listname,(result)=>{
            if(!result){
                res.status(401).json(result)
            }else{
                res.status(200).json(result);
            }
        })
    },
    delete:(req,res)=>{
        const id  = req.body;
        album.delete(id,(result)=>{
            if(!result){
                res.status(401).json(result)
            }else{
                res.status(200).json(result);
            }
        })
    },
    insertImage:(req,res)=>{
        const images = req.files;
        const album_id = req.params.id;
        const Listname  = images.map(({filename})=>filename);
        album.insertImage(album_id,Listname,(result)=>{
            if(!result){
                res.status(401).json(result);
            }else{
                res.status(200).json(result);
            }
        })
    },
    deleteImage:(req,res)=>{
        const album_id = req.params.id;
        const image_id = req.body.id;
        album.deleteImage(album_id,image_id,(result)=>{
            if(!result){
                res.status(401).json(result);
            }else{
                res.status(200).json(result);
            }
        })  
    }
}