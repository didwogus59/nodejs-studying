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
})

module.exports = mongoose.model('data',dataSchema);