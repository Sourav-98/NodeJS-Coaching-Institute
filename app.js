const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

//routes import
const AdminRoutes = require('./routes/adminRoutes');
const StudentRoutes = require('./routes/studentRoutes');
const DefaultRoutes = require('./routes/defaultRoutes');

const ObjectId = mongoose.Types.ObjectId;


//model imports
const Admin = require('./models/adminModel');
const Student = require('./models/studentModel');


// an instance of expressjs
const app = express();

// app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.use('/admin', AdminRoutes);
// app.use('/student', StudentRoutes);
app.use('/', DefaultRoutes);


mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to Database!');
    app.listen(9000);
})
.catch((err)=>{
    console.log('Error in connecting to database!');
});


// Admin.create({name: "Test Admin 1", user_name: "erjbnvenisd", email_id:"testemevsfail12@abc.com",  password: "Test@123"}, (err, callback)=>{
//     if(err){
//         console.log('Error in creating entry');
//         console.log(err.name, err.code);
//     }
//     else{
//         console.log(callback);
//         console.log('Entry Added!');
//     }
    
// });

// Student.create(
//     {
//         name: "Test Student 1", 
//         email_id: "teststudent@node.com", 
//         password: "Test@12345", 
//         enrolled_courses: [{course_id: 2342}, {course_id: 9372}]
//     },
//     (err)=>{
//         if(err) throw err;
//         console.log('Student Entered');
//     }
// );

Student.findOne({_id: '5e52c761e26f617321c01b7b'}, (err, student)=>{
    if(err){
        console.log(err);
    }
    console.log(typeof ObjectId.toString(student._id));
});


