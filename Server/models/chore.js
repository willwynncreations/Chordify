var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ChoreSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    coins:{
        type:Number,
        required:true
    },
    parent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    created:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        required:true
    }
   
});




var choreModel = mongoose.model('Chore',ChoreSchema);
module.exports = choreModel;


