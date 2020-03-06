// contains controllers for listing and viewing the different courses

exports.getCoursesPage = (req, res)=>{
    // listing all courses
    res.render('student/course-list', {pageTitle: "Courses", pagePath: "/courses"});
}

exports.getCourseInfoPage = (req, res)=>{
    var id = req.params.course_id;
    // fetch only 1 course
    res.render('student/course-details', {pageTitle: "Courses", pagePath: "/courses", course_id: id});
}
