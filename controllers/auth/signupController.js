
exports.getSignupPage = (req, res)=>{
    // render the signup page
    res.render('auth/signup', {pageTitle: "Signup", pagePath:"/signup"});
}

exports.postSignup = (req, res)=>{
    // register a new user
}
