// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');

const courseRoutes = require('./courseRoutes');
const studentController = require('./../controllers/studentController');

routes.use(express.static(path.join(__dirname, '..')));

routes.get('/home', studentController.getHomePage);
routes.use('/courses', courseRoutes);
routes.get('/cart', studentController.getCartPage);
routes.post('/checkout',studentController.postCheckout);
routes.get('/my-courses', studentController.getMyCoursesPage);
routes.post('/delete',studentController.postRemoveFromCart);

module.exports = routes;
