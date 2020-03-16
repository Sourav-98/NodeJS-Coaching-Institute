// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');

const courseRoutes = require('./courseRoutes');

const studentController = require('./../controllers/studentController');
// const authController = require('./../controllers/auth/authController');

routes.use(express.static(path.join(__dirname, '..')));

routes.get('/home', studentController.getHomePage);
routes.use('/courses', courseRoutes);
// routes.get('/courses', studentController.getCoursesPage);
routes.get('/cart', studentController.getCartPage);
routes.get('/checkout',studentController.getCheckout);


module.exports = routes;
