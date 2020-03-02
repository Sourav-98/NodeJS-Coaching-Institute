// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');

const defaultController = require('./../controllers/defaultController');
const authController = require('./../controllers/auth/authController');

routes.use(express.static(path.join(__dirname, '..', 'public')));



routes.get('/admin-login', defaultController.getAdminLoginPage);
routes.get('/login', defaultController.getLoginPage);
routes.get('/signup', defaultController.getSignupPage);
routes.get('/password-reset', defaultController.getPasswordResetPage);
routes.get('/', defaultController.getHomePage);
routes.get(defaultController.get404Page);

module.exports = routes;
