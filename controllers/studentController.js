// contains controllers for the Student view, where students can view the enrolled courses and search for courses

const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');

exports.getHomePage = (req, res)=>{
    res.render('student/home', {pageTitle: "Home", pagePath: "/", session_data: req.session});
}

exports.getCartPage = (req, res)=>{
    var cart; // get the cart items of a particular student
    Student.findOne({_id: req.session.userid}, (err, student)=>{
        if(err){
            res.redirect('/admin');
            return;
        }
        else{

            Course.find({_id: student.in_cart},(err,course)=>{
            res.render('student/in-cart', {pageTitle: "Cart", pagePath: "/cart", session_data: req.session,course_id: _id})
            
            })
            
        }
    })
    
}

exports.getMyCoursesPage = (req, res)=>{

}
