
exports.getPasswordResetPage = (req, res)=>{
    res.render('auth/password-reset', {pageTitle: "Password Reset", pagePath:"/password-reset"});
}

exports.postPasswordReset = (req, res)=>{
    
}
