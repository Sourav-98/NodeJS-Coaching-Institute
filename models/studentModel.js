const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Student', new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
    },
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}));
