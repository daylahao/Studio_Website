// const db = require('./handleSQL');
require('dotenv').config();
const Generate_Carts_Id = ()=>{
    const ms = new Date().getTime();
    console.log(ms);
    return ms;
}
const UrlAvatar=(name)=>{
    const url = `${process.env.HTTP}${process.env.HOST}:${process.env.PORT}/images/avatars/${name}`;
    return url; 
}
const UrlItems=(name)=>{
    const url = `${process.env.HTTP}${process.env.HOST}:${process.env.PORT}/images/items/${name}`;
    return url; 
}
const UrlGrallery=(name)=>{
    const url = `${process.env.HTTP}${process.env.HOST}:${process.env.PORT}/images/gallery/${name}`;
    return url; 
}
module.exports ={
    Generate_Carts_Id,
    UrlAvatar,
    UrlItems,
    UrlGrallery
    }