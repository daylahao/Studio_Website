const dotenv = require("dotenv");
const saltedSha256 = require('salted-sha256');
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const hashPassword = (rawPass) => {
    return saltedSha256(rawPass, process.env.SALT_PASSWORD);
}
const auth =  permissions =>{
    return (req,res,next)=>{
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    User.getById(verified.UID, (result) => {
        if(result.length < 1){
            return res.status(403).json({message: "Invalid Token"});
        }
    })
    // if( < 1){
    //     return res.status(403).json({message: "Invalid Token"});
    // }
    if(permissions.includes(verified.role)){
        next();
    }else {
        res.status(403).json({ message: 'Forbidden' });
    }}};
const validateToken = (req,callback) => {
        let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = req.header(tokenHeaderKey);
        const verified = jwt.verify(token, jwtSecretKey);
        // console.log(verified);
        User.getById(verified.UID, (result) => {
            if (result!={}) {
               return callback(result);
            }else {
               return callback(null);
            }
    })};
module.exports ={hashPassword,auth,validateToken};