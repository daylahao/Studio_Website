// const db = require('./handleSQL');
require('dotenv').config();
const Generate_Carts_Id = ()=>{
    const ms = new Date().getTime();
    console.log(ms);
    return ms;
}
const UrlAvatar=(name)=>{
    const url = `http://${process.env.HOST}:${process.env.PORT}/images/avatars/${name}`;
    return url; 
}
module.exports ={
    Generate_Carts_Id,
    UrlAvatar
    }