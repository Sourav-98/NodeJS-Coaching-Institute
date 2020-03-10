
const Student = require('./../../models/studentModel');
const Admin = require('./../../models/adminModel');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.mode=="student"){
        res.redirect('/');
    }
    else{
        res.render('auth/login', {pageTitle: "Login", pagePath:"/login", pass_err: false});
    }
}

exports.postLogin = (req, res)=>{       // student login post control
    if(req.session.isLoggedIn == true && req.session.mode=="student"){
        res.redirect('/');
    }
    else{
        var data = req.body;
        Student.findOne({email_id: data.email_id}, (err, student)=>{
            if(err){
                // console.log(err);
                res.redirect('/');
                return;
            }
            else{
                if(student == undefined){
                    res.redirect('/signup');    // the user doesn't exist, hence reroute to signup page
                }
                else{
                    // console.log(student);
                    bcrypt.compare(data.password, student.password, (err, match)=>{
                        if(err){
                            // console.log(err);
                            res.redirect('/');
                            return;
                        }
                        else{
                            if(match == false){
                                res.render('auth/login', {pageTitle: "Login", pagePath: "/login", pass_err: true});
                                return;
                            }
                            else{
                                req.session.isLoggedIn = true;
                                req.session.mode = "student";
                                req.session.user_id = student._id;
                                req.session.fname = student.fname;
                                res.redirect('/');
                                return;
                            }
                        }
                    });
                }
            }
        });
    }  
}

exports.getAdminLoginPage = (req, res)=>{
    if(req.session.isLoggedIn == true && req.session.mode=="admin"){
        res.redirect('/admin');
    }
    else{
        res.render('auth/admin-login', {pageTitle: "Admin Login", pagePath:"/admin-login", pass_err: false});
    }
}


exports.postAdminLogin = (req, res)=>{  // admin login post control
    // req.session.isLoggedIn = true;
    // req.session.mode = "admin";     // session mode is assigned as 'admin' (mode is a custom variable)
    // res.redirect('/');
    if(req.session.isLoggedIn == true && req.session.mode=="admin"){
        res.redirect('/admin');
    }
    else{
        var data = req.body;
        Admin.findOne({email_id: data.email_id}, (err, admin)=>{
            if(err){
                // console.log(err);
                res.redirect('/');
                return;
            }
            else{
                if(admin == undefined){
                    res.redirect('/admin-signup');    // the user doesn't exist, hence reroute to signup page
                }
                else{
                    // console.log(student);
                    bcrypt.compare(data.password, admin.password, (err, match)=>{
                        if(err){
                            res.redirect('/');
                            return;
                        }
                        else{
                            if(match == false){
                                res.render('auth/admin-login', {pageTitle: "Login", pagePath: "/login", pass_err: true});
                                return;
                            }
                            else{
                                req.session.isLoggedIn = true;
                                req.session.mode = "admin";
                                req.session.user_id = admin._id;
                                req.session.fname = admin.fname;
                                res.redirect('/admin');
                                return;
                            }
                        }
                    });
                }
            }
        });
    }
}

exports.getLogout = (req, res)=>{
    if(req.session.isLoggedIn==false){
        res.redirect('/');
    }
    else{
        req.session.destroy();  // destroy the session after logging out
        res.redirect('/');
    }
}
