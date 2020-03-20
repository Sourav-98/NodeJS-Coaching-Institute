// contains controllers for the Student view, where students can view the enrolled courses and search for courses

const Student = require('./../models/studentModel');
const Course = require('./../models/courseModel');

exports.getHomePage = (req, res)=>{
    res.render('student/home', {pageTitle: "Home", pagePath: "/", session_data: req.session});
}

exports.getCoursesPage = (req, res)=>{
    var course_list = undefined;
    Course.find((err, courses)=>{
        if(err){
            res.redirect('/');
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
            var enrolled = false;
            if(req.session.isLoggedIn == true && req.session.mode == "student"){
                Student.findOne({_id: req.session.user_id}, (err, student)=>{
                    if(err){
                        console.log(err);
                        return res.redirect('/');
                    }
                    else{
                        if(student.enrolled_courses.includes(course._id)){
                            enrolled = true;
                        }
                        res.render('course/course-details', {pageTitle: "Courses", pagePath: "/courses", course: course, session_data: req.session, enrolled: enrolled});
                    }
                });
            }
            else{
                res.render('course/course-details', {pageTitle: "Courses", pagePath: "/courses", course: course, session_data: req.session, enrolled: enrolled});
            }
        }
    });
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

exports.postAddToCartPage = (req, res)=>{
    if(req.session.isLoggedIn != true && req.session.mode != "student"){
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
                                        // console.log(callback);
                                        // console.log('Added To Cart');
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


exports.postCheckout = ( req ,res) => {
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
                var in_cart = student.in_cart;
                Course.updateMany({_id: in_cart}, { "$inc": {max_seats: -1} }, (err, callback)=>{
                    if(err){
                        console.log(err);
                    }
                });
                var enrolled = student.enrolled_courses;
                for( var c of in_cart){
                    if(!enrolled.includes(c)){
                        enrolled.push(c);
                    }
                }
                Student.updateOne({_id: req.session.user_id}, {in_cart: [], enrolled_courses: enrolled}, (err, callback)=>{
                    if(err){
                        console.log(err);
                        res.redirect('/');
                        return;
                    }
                    else{
                        res.redirect('/my-courses');
                    }
                });
            }   
        });
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

exports.postRemoveFromCart = (req,res) => {
    var idofcourse = req.body.course_id;
    Student.updateOne({_id: req.session.user_id}, {"$pull":{"in_cart":idofcourse}}, (err, callback)=>{
        if(err){
            console.log(err);
            res.redirect('/');
            return;
        }
        else{
            res.redirect('/cart');
        }
    });
}
