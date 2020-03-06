// contains controllers for the Student view, where students can view the enrolled courses and search for courses

exports.getHomePage = (req, res)=>{
    res.render('student/home', {pageTitle: "Home", pagePath: "/student/home", session_data: req.session});
}

exports.getCoursesPage = (req, res)=>{
    var obj = req.query;
    if(Object.keys(obj).length===0){
        res.render('student/course-list', {pageTitle: "Home", pagePath: "/student/home", session_data: req.session});
    }
    else if(Object.keys(obj).length===1){
        var course; // fetch the course from the database
        res.render('student/course-details', {pageTitle: "Home", pagePath: "/student/courses", session_data: req.session});
    }
}

exports.getCartPage = (req, res)=>{
    var cart; // get the cart items of a particular student
    res.render('student/cart', {pageTitle: "Cart", pagePath: "/cart", session_data: req.session})
}

