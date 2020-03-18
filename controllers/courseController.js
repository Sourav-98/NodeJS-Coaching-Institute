// contains controllers for listing and viewing the different courses

const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');

exports.getCoursesPage = (req, res)=>{
    var course_list = undefined;
    Course.find((err, courses)=>{
        if(err){
            res.redirect('/admin');
            return;
        }
        else{
            res.render('course/course-list', {pageTitle: "Courses", pagePath: "/courses", session_data: req.session, courses: courses});
        }
    });
}

exports.getCourseInfoPage = (req, res)=>{
    var id = req.params.course_id;
    Course.findOne({_id: id}, (err, course)=>{
        if(err){
            console.log(err);
            res.redirect('/courses');
        }
        else{
            res.render('course/course-details', {pageTitle: "Courses", pagePath: "/courses", course: course, session_data: req.session});
        }
    });
}


