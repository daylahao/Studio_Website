const Users = require("../models/users.model");
const hashPassword = require("../common/hashPassword");
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports={
    getAllName:(req,res)=>{
        Users.getAllName((result) => {
            res.json(result);
        });
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
            email: form.email,
            // password: hashPassword(form.password),
            password: form.password,
        }
        Users.login(user, (result) => {
            res.json(result);
        });
    },
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
    validate: permissions =>{
        return (req,res,next)=>{
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.header(tokenHeaderKey);
        // console.log(req);
        const verified = jwt.verify(token, jwtSecretKey);
        if (!User.getById(verified.UID)) {
            return res.status(403).json({message: "Invalid Token"});
        }
        if(!permissions.includes(role)){
            return res.status(403).json({message: "Invalid Token"});
        }
        next();
        }
        },
}