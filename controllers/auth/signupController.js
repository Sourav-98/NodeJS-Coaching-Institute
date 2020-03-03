const Student = require('./../../models/studentModel');

var error = {
    email_match: undefined, 
    password_match: undefined
};

exports.getSignupPage = (req, res)=>{
    res.render('auth/signup', {pageTitle: "Signup", pagePath:"/signup", err: error});
}

exports.postSignup = (req, res)=>{
    // register a new user
    var data = req.body;
    console.log(data);
    Student.find({email_id: data.email_id}, (err, callback)=>{
        if(err){
            console.log(err);
            // res.render();   // server error - 500
        }
        else{
            if(callback.length != 0){
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
                Student.create({
                        name: data.name,
                        email_id: data.email_id,
                        password: data.password
                    }, 
                    (err, student)=>{
                        if(err){
                            console.log(err);
                            res.redirect('/');
                        }
                        else{
                            res.redirect('/login');
                        }
                    }
                );
            }
        }
    });
}
