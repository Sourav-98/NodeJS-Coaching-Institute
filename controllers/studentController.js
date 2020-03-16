// contains controllers for the Student view, where students can view the enrolled courses and search for courses

const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');

exports.getHomePage = (req, res)=>{
    res.render('student/home', {pageTitle: "Home", pagePath: "/", session_data: req.session});
}

exports.getCheckout = ( req ,res) => {
    if(req.session.isLoggedIn != true && req.session.mode != "student"){
        res.redirect('/login');
    }
    else{
        Student.findOne({_id : req.session.user_id},(err, student)=>{
            if(err){
                res.redirect('/');
                return;
            }
            else{
                student.enrolled_courses.push(student.in_cart);
                console.log(student.enrolled_courses);
                
            }
        });
    }
    

}

exports.getCartPage = (req, res)=>{
    if(req.session.isLoggedIn != true || req.session.mode != "student"){
        res.redirect('/login');
    }
    else{
        Student.findOne({_id: req.session.user_id}, (err, student)=>{
            if(err){
                res.redirect('/');
                return;
            }
            else{
                Course.find({_id: student.in_cart}, (err,courses)=>{
                    res.render('student/in-cart', {pageTitle: "Cart", pagePath: "/cart", session_data: req.session, courses: courses});
                });
            }
        });
    }
}

exports.getMyCoursesPage = (req, res)=>{

}
