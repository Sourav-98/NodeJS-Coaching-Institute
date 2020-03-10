const express = require('express');
const routes = express.Router();
const path = require('path');

var loginController = require('./../controllers/auth/loginController');
var signupController = require('./../controllers/auth/signupController');
// var passwordresteController = require('./../controllers/auth/passwordresetController');

routes.use(express.static(path.join(__dirname, '..', 'public')));
routes.get('/login', loginController.getLoginPage);
routes.post('/login', loginController.postLogin);

routes.get('/admin-login', loginController.getAdminLoginPage);
routes.post('/admin-login', loginController.postAdminLogin);

routes.get('/signup', signupController.getSignupPage);
routes.post('/signup', signupController.postSignup);

routes.get('/admin-signup', signupController.getAdminSignupPage);
routes.post('/admin-signup', signupController.postAdminSignup);


routes.get('/logout', loginController.getLogout);
// routes.get('/password-reset', passwordresteController.getPasswordResetPage);
// routes.post('/password-reset', passwordresteController.postPasswordReset);

module.exports = routes;
