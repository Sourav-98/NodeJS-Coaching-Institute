// contains controllers for admin for managing the available courses
const Course = require('./../models/courseModel');

exports.getAdminHomePage = (req, res)=>{
    if(req.session.mode=="admin" && req.session.isLoggedIn == true){
        res.render('admin/home', {pageTitle: "Admin Home", pagePath:"/admin", session_data: req.session});
    }
    else{
        res.redirect('/admin-login');
    }
}

exports.getAddCourse = (req, res)=>{
    if(req.session.isLoggedIn != true || req.session.mode != "admin"){
        res.redirect('/admin-login');
    }
    else{
        res.render('admin/add-course', {pageTitle:"Add New Course", pagePath:'/admin/add-course', session_data: req.session});
    }
}

exports.postAddCourse = (req, res)=>{
    var data = req.body;
    var image = req.file;
    Course.create({
        course_name: data.course_name, 
        course_type: data.course_type, 
        course_author: data.course_author, 
        lec_hours: data.lec_hours,
        course_desc: data.course_desc,
        price: data.price,
        max_seats: data.max_seats,
        image_url: image.path.slice(7)
    }, (err, callback)=>{
        if(err){
            console.log(err);
            res.redirect('/admin/add-course');
        }
        else{
            console.log('Entry Added!');
        }
        res.redirect('/admin');
    });
}

exports.getManageCoursesPage = (req, res)=>{
    // listing all courses
    if(req.session.mode == "admin" && req.session.isLoggedIn == true){
        var course_list = undefined;
        Course.find((err, courses)=>{
            if(err){
                res.redirect('/admin');
                return;
            }
            else{
                course_list = courses;
                res.render('course/course-list', {pageTitle: "Manage Courses", pagePath:"/admin/manage-courses", session_data: req.session, courses: courses});
            }
        });
        
    }
    else{
        res.redirect('/admin-login');
    }
}

exports.getEditCoursePage = (req, res)=>{
    var id = req.params.course_id;
    if(req.session.mode == "admin" && req.session.isLoggedIn == true){
        res.render('course/course-details', {pageTitle: "Edit Course", pagePath:"/admin/manage-courses", course_id: id, session_data: req.session});
    }
    else{
        res.redirect('/admin-login');
    }
}

