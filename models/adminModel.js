const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Admin', new Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    email_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}));
