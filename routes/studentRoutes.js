// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');

const studentController = require('./../controllers/studentController');
// const authController = require('./../controllers/auth/authController');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/home', studentController.getHomePage);
routes.get('/courses', studentController.getCoursesPage);

module.exports = routes;
