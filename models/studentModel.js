const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Student', new Schema({
    fname: {
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    in_cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    enrolled_courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}));
