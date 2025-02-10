const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    role: { 
        type: String, 
        default: "user" 
    },
    password:{
        type:Number,
        required:true,
    }
})

const USER = mongoose.model('user',userSchema);
module.exports = USER;