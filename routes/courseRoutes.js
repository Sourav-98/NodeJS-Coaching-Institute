const express = require('express');
const routes = express.Router();
const path = require('path');

const courseController = require('./../controllers/courseController');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', courseController.getCoursesPage);
routes.get('/:course_id', courseController.getCourseInfoPage);

module.exports = routes;
