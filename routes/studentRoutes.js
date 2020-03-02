// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');

const studentController = require('./../controllers/studentController');
// const authController = require('./../controllers/auth/authController');

routes.use(express.static(path.join(__dirname, '..')));

routes.get('/home', studentController.getHomePage);
routes.get('/courses', studentController.getCoursesPage);
<<<<<<< HEAD
=======
routes.get('/cart', studentController.getCartPage);
>>>>>>> 78f5097851a7937c0fb8b674a3b6a5b382078ad8

module.exports = routes;
