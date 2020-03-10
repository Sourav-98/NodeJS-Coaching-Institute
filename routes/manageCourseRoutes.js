const express = require('express');
const routes = express.Router();
const path = require('path');

const courseController = require('./../controllers/manageCourseController');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', courseController.getManageCoursesPage);
routes.get('/:course_id', courseController.getEditCoursePage);

module.exports = routes;
