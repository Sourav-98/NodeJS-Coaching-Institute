// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');

const studentController = require('./../controllers/studentController');
// const authController = require('./../controllers/auth/authController');

routes.use(express.static(path.join(__dirname, '..')));

routes.get('/home', studentController.getHomePage);
routes.get('/courses', studentController.getCoursesPage);
routes.get('/cart', studentController.getCartPage);

module.exports = routes;
