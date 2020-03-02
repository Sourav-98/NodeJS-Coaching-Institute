var mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Course', new Schema({
    course_name: {
        type: String,
        unique: true,
    },
    course_author:{
        type: String,
    },
    course_type:{
        type: String,
        required: true
    },
    lec_hours: Number,
    max_seats: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image_url:{
        type: String,
        required: true
    }
}));
