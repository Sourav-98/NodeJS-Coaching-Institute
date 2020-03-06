// contains controllers for listing and viewing the different courses

const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');

exports.getCoursesPage = (req, res)=>{
    // listing all courses
    res.render('student/course-list', {pageTitle: "Courses", pagePath: "/courses", session_data: req.session});
}

exports.getCourseInfoPage = (req, res)=>{
    var id = req.params.course_id;
    // fetch only 1 course
    res.render('student/course-details', {pageTitle: "Courses", pagePath: "/courses", course_id: id, session_data: req.session});
}

exports.getMyCoursesPage = (req, res)=>{
    Student.findOne({_id: req.session.user_id}, (err, student)=>{
        if(err){
            console.log(err);
            res.redirect('/');
            return;
        }
        else{
            var enrolled = student.enrolled_courses;
            Course.find({_id: enrolled}, (err, courses)=>{
                if(err){
                    console.log(err);
                    res.redirect('/');
                    return;
                }
                else{
                    res.render('student/my-courses', {pageTitle:"My Course", pagePath:"/my-courses", session_data: req.session, enrolled: courses});
                }
            });
        }
    })
}
