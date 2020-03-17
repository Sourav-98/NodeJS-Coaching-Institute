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

exports.postAddToCartPage = (req, res)=>{
    if(req.session.isLoggedIn != true){
        res.redirect('/login');
    }
    else{
        Course.findOne({_id: req.params.course_id}, (err, course)=>{
            if(err){
                console.log(err);
                res.redirect('/');
                return;
            }
            else{
                if(course.max_seats == 0){
                    res.redirect('/');
                }
                else{
                    Student.findById(req.session.user_id, (err, student)=>{
                        if(err){
                            console.log(err);
                            res.redirect('/');
                        }
                        else{
                            var updated_cart = student.in_cart;
                            if(!updated_cart.includes(course._id)){
                                updated_cart.push(course._id);
                                Student.updateOne({_id: student._id}, {in_cart: updated_cart}, (err, callback)=>{
                                    if(err){
                                        throw err;
                                    }
                                    else{
                                        console.log(callback);
                                        console.log('Added To Cart');
                                        res.redirect('/cart');
                                    }
                                });
                            }
                            else{
                                console.log('Course Already Added!');
                                res.redirect('/cart');
                            }
                        }
                    });
                }
            }
        })
    }
    
}

exports.getMyCoursesPage = (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.mode == "student"){
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
        });
    }
    else{
        res.redirect('/login');
    }
}
