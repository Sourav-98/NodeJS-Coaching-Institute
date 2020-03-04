
const Student = require('./../../models/studentModel');
const Admin = require('./../../models/adminModel');
const bcrypt = require('bcrypt');

exports.getLoginPage = (req, res)=>{
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {pageTitle: "Login", pagePath:"/login", pass_err: false});
}

exports.getAdminLoginPage = (req, res)=>{
    res.render('admin/login', {pageTitle: "Admin Login", pagePath:"/admin-login", pass_err: pass_err});
}

exports.postLogin = (req, res)=>{       // student login post control
    var data = req.body;
    Student.findOne({email_id: data.email_id}, (err, student)=>{
        if(err){
            console.log(err);
            res.redirect('/');
            return;
        }
        else{
            if(student.length == 0){
                res.redirect('/signup');    // the user doesn't exist, hence reroute to signup page
            }
            else{
                console.log(student);
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
                            res.redirect('/');
                            return;
                        }
                    }
                });
            }
        }
    });    
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
