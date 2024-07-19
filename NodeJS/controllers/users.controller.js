const Users = require("../models/users.model");
const hashPassword = require("../common/hashPassword");
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
    }
}