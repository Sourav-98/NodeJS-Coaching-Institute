// contains controllers for the Student view, where students can view the enrolled courses and search for courses

const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');

exports.getHomePage = (req, res)=>{
    res.render('student/home', {pageTitle: "Home", pagePath: "/", session_data: req.session});
}

exports.getCartPage = (req, res)=>{
    var cart; // get the cart items of a particular student
    res.render('student/cart', {pageTitle: "Cart", pagePath: "/cart", session_data: req.session})
}

exports.getMyCoursesPage = (req, res)=>{

}
