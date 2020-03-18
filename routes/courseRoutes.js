const express = require('express');
const routes = express.Router();
const path = require('path');

const studentController = require('./../controllers/studentController');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', studentController.getCoursesPage);
routes.get('/:course_id', studentController.getCourseInfoPage);
routes.post('/:course_id', studentController.postAddToCartPage);

module.exports = routes;
