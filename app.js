const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//routes import
const AdminRoutes = require('./routes/adminRoutes');
// const StudentRoutes = require('./routes/studentRoutes');
// const DefaultRoutes = require('./routes/defaultRoutes');
const AuthRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: true}));
// app.use('/student', StudentRoutes);
app.use('/', AuthRoutes);
app.use('/admin', AdminRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>{
    res.render('index', {pageTitle: "courseRus.com", pagePath:"/"});
});
app.use((req, res)=>{
    res.render('includes/404', {pageTitle: "404", pagePath:"404"})
});

app.listen(9000);

/*

Routes Needed

/               -   Home
/login          -   Student Login
/signup
/admin-login    -   Admin Login
/logout

/student/home   -   Student Home Page
/student/courses - List of Courses
/student/courses?coursename=<course_id> - Info of a particular course

/admin/home
/admin/add-course
/admin/manage - a master manage window
/admin/manage?coursename
*/

//model imports
const Admin = require('./models/adminModel');
const Student = require('./models/studentModel');
const Course = require('./models/courseModel');

mongoose.connect('mongodb+srv://sourav98:tCMmjBJqG12kDgZR@cluster0-12p2n.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to Database!');

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

// Course.create({course_name: "NodeJS Master Class", course_type:"Training", lec_hours: 41, max_seats: 25, price: 450}, (err, callback)=>{
//     if(err){
//         throw err;
//     }
//     else{
//         console.log('Entry Added!');
//     }
// });

// Course.create({course_name: "MongoDB Master Class", course_type:"Training", lec_hours: 35, max_seats: 25, price: 400}, (err, callback)=>{
//     if(err){
//         throw err;
//     }
//     else{
//         console.log('Entry Added!');
//     }
// });



// Student.create(
//     {
//         name: "Test Student 1", 
//         email_id: "teststudent123@node.com",
//         phone: "3829349384", 
//         password: "Test@12345"
//     },
//     (err, callback)=>{
//         if(err) throw err;
//         console.log('Student Entered');
//     }
// );

// Student.create(
//     {
//         name: "Test Student 2", 
//         email_id: "teststudent12345@node.com",
//         phone: "7999349334", 
//         password: "Test@12345"
//     },
//     (err, callback)=>{
//         if(err) throw err;
//         console.log('Student Entered');
//     }
// );


// var course_id = '5e55ed7200faa8085092f6f0';
// var student_id = '5e55ed7200faa8085092f6f2';
// Student.findById(student_id, (err, student)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(student);
//         var updated_cart = student.in_cart;
//         if(!updated_cart.includes(course_id)){
//             updated_cart.push(course_id);
//             Student.updateOne({_id: student_id}, {in_cart: updated_cart}, (err, callback)=>{
//                 if(err){
//                     throw err;
//                 }
//                 else{
//                     console.log(callback);
//                     console.log('Added To Cart');
//                 }
//             });
//         }
//         else{
//             console.log('Course Already Added!');
//         }
//     }
// });

// var student_id = '5e55ed7200faa8085092f6f2';

// Student.findById(student_id, (err, student)=>{
//     var cart_items = student.in_cart;
//     Course.find({_id: cart_items}, (err, items)=>{
//         console.log(items);
//     });
// });
    

})
.catch((err)=>{
    console.log('Error in connecting to database!');
});


// Adding a new course
// Course.create({course_name: "MongoDB Master Class", course_type:"Training", lec_hours: 35, max_seats: 25, price: 400}, (err, callback)=>{
//     if(err){
//         throw err;
//     }
//     else{
//         console.log('Entry Added!');
//     }
// });


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
//         name: "Test Student 2", 
//         email_id: "teststudent123@node.com",
//         phone: "3829349384", 
//         password: "Test@12345"
//     },
//     (err, callback)=>{
//         if(err) throw err;
//         console.log('Student Entered');
//     }
// );

// On click of Add to Cart button - add the 

// var course_id = '5e53cfc224d2557f09662e21';
// var student_id = '5e53e044eff8cd8067c0dfb7';
// Student.findById(student_id, (err, student)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(student);
//         var cart = student.in_cart;
//         if(!cart.includes(course_id)){
//             cart.push('5e53cfc224d2557f09662e21');
//             Student.updateOne({_id: '5e53e044eff8cd8067c0dfb7'}, {in_cart: cart}, (err, callback)=>{
//                 if(err){
//                     throw err;
//                 }
//                 else{
//                     console.log(callback);
//                     console.log('Added To Cart');
//                 }
//             });
//         }
//         else{
//             console.log('Course Already Added!');
//         }
//     }
// });

// find list of students with the particular course in cart

// Student.find({in_cart: '5e53cf4ef44cb67ef460cccf'}, (err, callback)=>{
//     if(err) throw err;
//     else{
//         console.log(callback);
//     }
// });


// find the course details from the student cart info

// Student.findById(student_id, (err, student)=>{
//     if(err) throw err;
//     else{
//         Course.find({_id: student.in_cart}, (err, callback)=>{
//             console.log(callback);
//         });
//     }
// });


