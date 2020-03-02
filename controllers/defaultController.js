// contains the default controllers for the website

exports.getHomePage = (req, res)=>{
    res.render('index', {pageTitle: "Home", pagePath:"/"});
}

exports.getLoginPage = (req, res)=>{
    // console.log(Object.keys(req.query).length);
    res.render('auth/login', {pageTitle: "Login", pagePath:"/login"});
}

exports.getSignupPage = (req, res)=>{
    res.render('auth/signup', {pageTitle: "Signup", pagePath:"/signup"});
}

exports.getAdminLoginPage = (req, res)=>{
    res.render('admin/login', {pageTitle: "Admin Login", pagePath:"/admin-login"});
}

exports.getPasswordResetPage = (req, res)=>{
    res.render('auth/password-reset', {pageTitle: "Password Reset", pagePath:"/password-reset"});
}

exports.get404Page = (req, res)=>{
    res.render('includes/404', {pageTitle: "404", pagePath:"404"})
}
