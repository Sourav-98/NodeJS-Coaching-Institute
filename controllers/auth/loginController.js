
exports.getLoginPage = (req, res)=>{
    res.render('auth/login', {pageTitle: "Login", pagePath:"/login"});
}

exports.getAdminLoginPage = (req, res)=>{
    res.render('admin/login', {pageTitle: "Admin Login", pagePath:"/admin-login"});
}

exports.postLogin = (req, res)=>{
    
}

exports.postAdminLogin = (req, res)=>{

}

exports.getLogout = (req, res)=>{

}
