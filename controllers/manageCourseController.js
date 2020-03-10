// contains controllers for listing and viewing the different courses

const Course = require('./../models/courseModel');

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
