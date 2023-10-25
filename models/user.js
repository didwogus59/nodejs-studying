const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please provide name'],
        minlength:3,
        maxlength: 50,
        unique:true,
    },
    password: {
        type:String,
        required: [true, 'Please provide, password'],
        minlength: 6,
    },
})

module.exports = mongoose.model('user',userSchema);