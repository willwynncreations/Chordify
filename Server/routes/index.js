const express = require("express");
const router = express.Router();





router.get('/',(req,res,next)=>{

    let msg = {
        message:'Successfully routed!'
    }


    res.status(200).send({message:JSON.stringify(msg)});
    console.log(`This is it!`);
});

module.exports=router;