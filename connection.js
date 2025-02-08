const mongoose = require("mongoose");

async function connectMongo(url){
    mongoose.connect(url);
}

module.exports = {
connectMongo
};