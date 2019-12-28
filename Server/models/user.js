var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        required:true,
        default:Date.now()
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
   
});


var UserModel = mongoose.model('User',UserSchema);
module.exports = userModel;