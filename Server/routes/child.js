const express = require("express");
const router = express.Router();
const Child = require("../models/child");
const bcrypt = require("bcryptjs");


router.get('/', (req, res, next) => {

    let msg = {
        message: 'Successfully routed!'
    }


    res.status(200).send({
        message: JSON.stringify(msg)
    });
    console.log(`This is it!`);
});



router.post('/add',(req,res,next)=>{
    //console.log(req.body)
    Child.find({username:req.body.username},(err,foundChild)=>{
        if(err){
            res.status('500').send(`Error adding child - ${err}`);
        }else{
            
            if(foundChild.username === req.body.username){
                res.status('501').send(`Username already in use.`);
            }else{

                if(req.body.password.length != 4){
                    res.status('502').send(`Error, PIN code must be 4 digits`);
                }else{
                    let saltRounds = 10;
                    bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
                        let child = new Child({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            age: req.body.age,
                            parent_id: req.body.parent_id,
                            username: req.body.username,
                            password: hash,
                            level: 1,
                            experience: 0,
                            coins: 0
                        });
                        //save the new child
                        child.save((err)=>{
                            //console.log(child);
                            if(err){
                                //console.log(err);
                                res.status('503').send(`Error saving new child - ${err}`)
                            }else{//pull up the child we just created and return it.
                                Child.find({username:req.body.username},(err,newChild)=>{
                                    if(err){
                                        res.status('504').send(`Error retrieving new child ${err}`)

                                    }else{
                                        //console.log(newChild);
                                        res.status(200).send({child:newChild});
                                    }
                                })
                            }
                        });

                    });
                }

            }
        }
    })
});

router.post('/login', (req, res, next) => {
    var password = req.body.password;
    const saltRounds = 10;

    //search for the email, if we get someone then compare the stored hash to the new pw after hasing it.
    //if we dont find the email return error, if the pws dont match return error.

    Child.find({
        username: req.body.username
    }, (err, foundChild) => {
        if (err) {
            res.status('400').send(`Error finding user by username ${err}`);
        } else {
            let child = foundChild[0]; //Get the first(should be only) user found

            bcrypt.compare(password, user.password, (err, passwordMatched) => {
                if (err) {
                    res.status('400').send(`Error comparing passwords ${err}`);
                } else if (passwordMatched) {
                    //passwords matched so we need to return a session and some user data
                    bcrypt.genSalt().then(rndHash => {
                        bcrypt.hash("SESSION", rndHash).then(token => {
                            Child.findOneAndUpdate({
                                _id: child._id
                            }, {
                                token: token
                            }, err => {
                                if (err) {
                                    res.status('400').send(`Error saving user with token ${err}`);
                                } else {
                                    res.send({
                                        token: token,
                                        child: child
                                    });
                                }
                            });

                        });
                    });
                } else {

                    res.status('400').send("Password doesn't match")
                }
            });
        }
    });
});
module.exports = router;