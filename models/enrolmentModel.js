const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Enrolment', new Schema({
    course_id:{
        type: Schema.Types.ObjectId,
        required: true
    },
    student_id:{
        type: Schema.Types.ObjectId,
        required: true
    }
}));
