const Student = require('./../../models/studentModel');
const bcrypt = require('bcrypt');

exports.getSignupPage = (req, res)=>{
    if(req.session.isLoggedIn == true){
        res.redirect('/');
    }
    else{
        res.render('auth/signup', {pageTitle: "Signup", pagePath:"/signup", err: {email_match: undefined, 
            password_match: undefined}});
    }
}

exports.postSignup = (req, res)=>{
    if(req.session.isLoggedIn == true){
        res.redirect('/');
    }
    else{
        // register a new user
        var data = req.body;
        // console.log(data);
        Student.findOne({email_id: data.email_id}, (err, student)=>{
            if(err){
                console.log(err);
                // res.render();   // server error - 500
            }
            else{
                var error = {
                    email_match: undefined, 
                    password_match: undefined
                };
                if( student != undefined){
                    error.email_match = true;
                    res.render('auth/signup', {pageTitle: "Signup", pagePath:"/signup", err: error});
                    return;
                }
                else{
                    if(data.password != data.confirmPassword){
                        error.password_match = false;
                        res.render('auth/signup', {pageTitle: "Signup", pagePath:"/signup", err: error});
                        return;
                    }
                    bcrypt.hash(data.password, 10, (err, hash_password)=>{
                        if(err){
                            res.redirect('/signup');
                            return;
                        }
                        else{
                            Student.create({
                                fname: data.fname,
                                lname: data.lname,
                                email_id: data.email_id,
                                password: hash_password
                            }, 
                            (err, student)=>{
                                if(err){
                                    console.log(err);
                                    res.redirect('/');
                                }
                                else{
                                    res.redirect('/login');
                                }
                            });
                        }
                    });
                }
            }
        });
    }
}
