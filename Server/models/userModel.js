const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        max:50,
    },

    password:{
        type: String,
        required: true,
        min:2,
    },
    isVerified: Boolean,
    document:[String]
});


module.exports = mongoose.model('User', userSchema);