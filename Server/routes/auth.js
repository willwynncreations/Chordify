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
router.post('/login',(req,res,next)=>{
    var password = req.body.password;
    const saltRounds = 10;
    var email = req.body.email;

    //search for the email, if we get someone then compare the stored hash to the new pw after hasing it.
    //if we dont find the email return error, if the pws dont match return error.

    User.find({email:email},(err,foundUser)=>{
        if(err){
            res.status('400').send(`Error finding user by email ${err}`);
        }else{
            let user = foundUser[0];//Get the first(should be only) user found

            bcrypt.compare(password,user.password,(err,passwordMatched)=>{
                if(err){
                    res.status('400').send(`Error comparing passwords ${err}`);
                }else if(passwordMatched){
                    //passwords matched so we need to return a session and some user data
                    bcrypt.genSalt().then(rndHash=>{
                        bcrypt.hash("SESSION",rndHash).then(token =>
                            res.send({token:token,me:user}));
                    });
                }else{
                
                    res.status('400').send("Password doesn't match")
                }
            });
        }
    });
});
module.exports=router;