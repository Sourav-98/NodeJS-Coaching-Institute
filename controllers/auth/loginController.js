
const Student = require('./../../models/studentModel');
const Admin = require('./../../models/adminModel');

exports.getLoginPage = (req, res)=>{
    // console.log(req.session.isLoggedIn);
    res.render('auth/login', {pageTitle: "Login", pagePath:"/login"});
}

exports.getAdminLoginPage = (req, res)=>{
    res.render('admin/login', {pageTitle: "Admin Login", pagePath:"/admin-login"});
}

exports.postLogin = (req, res)=>{       // student login post control
    req.session.isLoggedIn = true;
    req.session.mode = "student";
    res.redirect('/');
}

exports.postAdminLogin = (req, res)=>{  // admin login post control
    req.session.isLoggedIn = true;
    req.session.mode = "admin";     // session mode is assigned as 'admin' (mode is a custom variable)
    res.redirect('/');
}

exports.getLogout = (req, res)=>{
    req.session.destroy();  // destroy the session after logging out
    res.redirect('/');
}
