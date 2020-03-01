// contains controllers for admin for managing the available courses
const Course = require('./../models/courseModel');

exports.getAddCourse = (req, res)=>{
    res.render('admin/add-course', {pageTitle:"Add New Course", pagePath:'/admin/add-course'});
}

exports.postAddCourse = (req, res)=>{
    var data = req.body;
    console.log(req.file);
    res.redirect('/admin/add-course');
    // Course.create({
    //     course_name: data.course_name, 
    //     course_type: data.course_type, 
    //     course_author: data.course_author, 
    //     lec_hours: data.lec_hours,
    //     price: data.price,
    //     max_seats: data.max_seats
    // }, (err, callback)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log('Entry Added!');
    //     }
    //     res.redirect('/admin/home');
    // });
}
