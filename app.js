const express = require('express');
const session = require('express-session')

const app = express();

var mongoose = require('mongoose');

var Admin = require('./models/adminModel');
var Student = require('./models/studentModel');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to Database!');
    app.listen(9000);
})
.catch((err)=>{
    console.log('Error in connecting to database!');
});


// Admin.create({name: "Test Admin 1", user_name: "TstAdmin1", password: "Test@123"}, (err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('Entry Added!');
// });

Student.create(
    {
        name: "Test Student 1", 
        email_id: "teststudent@node.com", 
        password: "Test@12345", 
        enrolled_courses: [{course_id: 2342}, {course_id: 9372}]
    },
    (err)=>{
        if(err) throw err;
        console.log('Student Entered');
    });


