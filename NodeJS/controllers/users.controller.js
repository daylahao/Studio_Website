const Users = require("../models/users.model");
const hashPassword = require("../common/hashPassword").hashPassword;
const {Generate_Carts_Id,UrlAvatar} = require("../common/handleSQL")
const validateToken = require("../common/hashPassword").validateToken;
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');

require('dotenv').config();
module.exports={
    test:(req,res)=>{
        let a = __dirname;
        res.send(a);
    },
    getAllName:(req,res)=>{
        Users.getAllName((result) => {
            res.json(result);
        });
    },
    getInformation:(req,res)=>{
        validateToken(req,(result)=>{
        // console.log(result.UID);
        Users.getById(result.UID, (result) => {
            res.json(result);
        });
        })
        
    },
    getById: (req,res)=>{
        const id = req.params.id;
        console.log(id);
        Users.getById(id, (result) => {
        res.json(result);
    });
    },
    insert: (req,res)=>{
        const form = JSON.parse(req.body);
        // let a = body;
        const user = {
            name : form.name,
            phone: form.phone,
            email: form.email,
            password: hashPassword(form.password),
            role: form.role,
        }
        // console.log(user);   
        Users.insert(user, (result) => {
            res.json(result);    
        });
    },
    login:(req,res)=>{
        const form = JSON.parse(req.body);
        const user = {
            name: form.name,
            password: hashPassword(form.password),
        }
        Users.login(user, (result) => {
            if(result.status==200)
            res.status(200).json(result);
            else{
                res.status(401).json(result);
            }
        });
    },  
    register:(req,res)=>{
        const form = JSON.parse(req.body);
        const carts_id = Generate_Carts_Id();
        console.log(UrlAvatar("default.png"));
        console.log(carts_id);
        const user = {
            name : form.name,
            phone: form.phone,
            email: form.email,
            token:"",
            gender: form.gender,
            birthday: form.birthday,
            avt:"default.png",
            password: hashPassword(form.password),
            role: form.role,
            cart_id: carts_id,
        }
        Users.insert(user, (result) => {
            res.json(result);
        });
    },
    delete:(req,res)=>{
        const body = JSON.parse(req.body);
        Users.delete(body.UID,(result)=>{
            if(result){
                res.status(200).json(result);
            }else{
                res.status(401).json(result);
            }
        })
    },
    update:(req,res)=>{
        const id = req.params.id;
        // const body = req.body;
        const {avt,...body} = req.body;
        const avt_ = req.file;
        if(avt){
            body['avt']=avt;
        }
        else if(avt_){
                body['avt']=avt_.filename;
        }
        const userupdate = {
            UID:id,
           change:body,
        }
        Users.update(userupdate,(result)=>{
            if(result){
                res.status(200).json(result);
            }else{
                res.status(401).json(result);
            }
        })
    },
    EmailNotify:(req,res)=>{
        const email = JSON.parse(req.body);
        // console.log(email);
        Users.Insert_EmailNotify(email,(result)=>{
            if(result){
                res.status(200).json(result);
            }else{
                res.status(401).json(result);
            }
        })
    },
    UpdateSelf:(req,res)=>{
        const {avt,...body} = req.body;
        const avt_ = req.file; 
        validateToken(req,(result)=>{
            const UID  = result.UID;
            if(req.file){
                body['avt']= req.file.filename;
            }
            if(req.body['birthday'])
            {
                body['birthday'] = moment(body['birthday']).tz('Asia/Bangkok').format()
            }
            const userupdate = {
                UID:UID,
               change:body,
            }
            // console.log(userupdate);
            Users.update(userupdate,(result)=>{
                if(result){
                    res.status(200).json(result);
                }else{
                    res.status(401).json(result);
                }
            })
            // res.send(userupdate)
            // console.log(userupdate);
        })
    }
    // generate:(req,res)=>{
    //     // Validate User Here
    // // Then generate JWT Token
    // let jwtSecretKey = process.env.JWT_SECRET_KEY;
    // body = JSON.parse(req.body)
    // console.log(body);
    // let data = {
    //     UID: body.UID,
    //     name : body.name,
    //     // phone: body.phone,
    //     // email: body.email,
    //     // password: hashPassword(body.password),
    //     role: body.role,
    // }
    // const token = jwt.sign(data, jwtSecretKey);
    // res.send(token);
    // },
    // validate: permissions =>{
    //     return (req,res,next)=>{
    //     let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    //     let jwtSecretKey = process.env.JWT_SECRET_KEY;
    //     const token = req.header(tokenHeaderKey);
    //     // console.log(req);
    //     const verified = jwt.verify(token, jwtSecretKey);
    //     if (!User.getById(verified.UID)) {
    //         return res.status(403).json({message: "Invalid Token"});
    //     }
    //     if(!permissions.includes(role)){
    //         return res.status(403).json({message: "Invalid Token"});
    //     }
    //     next();
    //     }
    //     },
}