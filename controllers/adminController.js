// contains controllers for admin for managing the available courses
const Course = require('./../models/courseModel');

exports.getAddCourse = (req, res)=>{
    if(req.session.isLoggedIn !== false || req.session.mode != "admin"){
        res.redirect('/admin-login');
    }
    res.render('admin/add-course', {pageTitle:"Add New Course", pagePath:'/admin/add-course'});
}

exports.postAddCourse = (req, res)=>{
    var data = req.body;
    var image = req.file;
    // console.log(req.file);
    // console.log(req.file.filename);
    Course.create({
        course_name: data.course_name, 
        course_type: data.course_type, 
        course_author: data.course_author, 
        lec_hours: data.lec_hours,
        price: data.price,
        max_seats: data.max_seats,
        image_url: image.filename
    }, (err, callback)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Entry Added!');
        }
        res.redirect('/admin/home');
    });
    res.redirect('/admin/add-course');
}
