var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ChildSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    coins: {
        type: Number,
        required: true
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    level:{
        type:Number,
        required: true,
        default: 1
    }

});


var ChildModel = mongoose.model('Child', ChildSchema);
module.exports = ChildModel;
