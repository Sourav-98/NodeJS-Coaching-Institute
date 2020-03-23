// contains controllers for admin for managing the available courses
const Course = require('./../models/courseModel');
const Student = require('./../models/studentModel');

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

exports.postDeleteCourse = (req, res)=>{
    if(req.session.mode != "admin"){
        return res.redirect('/admin-login');
    }
    else{
       let course_id = req.body.course_id;
       console.log(course_id);
       
        Course.deleteOne({_id: course_id}, (err, callback)=>{
            if(err){
                res.redirect('/admin');
            }
            else{
                Student.find({}, (err,student)=>{
                   
                    console.log(student.length);
                  //console.log(student);
                    student.forEach(stud=> {
                    console.log(stud._id);
                    Student.updateMany({_id:stud._id},{"$pull":{"in_cart": {"$in":course_id},"enrolled_courses":{"$in": course_id}}},(err, callback)=>{
                        if(err){
                            console.log(err);
                            res.redirect('/');
                            return;
                        }
                        else{
                            res.redirect('/admin/manage-courses');
                        }
                    });
                   
                        });
                  
                 // console.log(student);
                });
                
            }
        });

        

        

    }
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
    if(req.session.mode != "admin" || req.session.isLoggedIn != true){
        return res.redirect('/admin-login');
    }
    else{
        var id = req.params.course_id;
        Course.findOne({_id: id}, (err, course)=>{
            if(err){
                return res.redirect('/admin');
            }
            else{
                res.render('admin/edit-course', {pageTitle: "Edit Course", pagePath:"/admin/manage-courses", session_data: req.session, course: course});
            }
        });
    } 
}

exports.postEditCourse = (req, res)=>{
    var id = req.params.course_id;
    var data = req.body;
    var image = req.file;
    Course.findOneAndUpdate({_id: id}, {
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
            res.redirect('/admin');
        }
        else{
            var urlString = '/admin/manage-courses/' + id;
            res.redirect(urlString);
        }
    });
}

