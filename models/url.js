const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({

    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectUrl: {
        type:String,
        required:true,
    },
    urlClicks: {
        type:Number,
        default:true,
    },
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
     
    analytics: [{
        timestamp: {
            type:Date,
            default:Date.now,
        },
        ip:{
            type:String,
        },
        location:{
            type:String,
        },
        device:{
            type:String,
        },
    },],
    expiresAt: { type: Date },// Expiry timestamp
},);

const URL = mongoose.model("url",urlSchema);

module.exports = URL;