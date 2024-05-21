const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected To Database");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = connectToDB;