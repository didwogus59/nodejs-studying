const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        type:String,
        required:[true, 'Please provide name'],
        minlength: 1,
        maxlength: 100,
    },

    data: {
        type:String,
    },

    user_id : {
        type:String,
        required:[true, 'Please provide id'],
    },

    name: {  
        type:String,
        required:[true, 'Please provide id'],
    }
})

module.exports = mongoose.model('user_data',dataSchema);