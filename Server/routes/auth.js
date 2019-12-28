const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");



router.post('/register',(req,res,next)=>{
    var password = req.body.password;
    var saltRounds = 10;
    User.find({
        email:req.body.email
    },(err,foundUser)=>{
        if(err){
            res.status(501).send(`Error Registering - ${err}`)
        }

        if(foundUser.email == req.body.email){
            res.status(201).send(`Email Already Registered`)
        }else{
            if(req.body.password === ""||req.body.password.length<8){
                res.status(202).send(`Password must be 8 characters or more`)
            }else{
                bcrypt.hash(password,saltRounds,(err,hash)=>{
                    var user = new User({
                        email: req.body.email,
                        password: hash,
                        title: req.body.title,
                        type: "Parent",
                        created: Date(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,

                    });
                    user.save((err)=>{
                        if(err){
                            res.status(502).send(`Error Registering - ${err}`)
                        }else{
                            res.status(200).send(`Successful`)
                        }
                    });
                });
            }
        }

    });



});

module.exports=router;