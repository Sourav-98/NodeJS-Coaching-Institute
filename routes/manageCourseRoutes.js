const express = require('express');
const routes = express.Router();
const path = require('path');

const adminController = require('./../controllers/adminCourseController');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', adminController.getManageCoursesPage);
routes.get('/:course_id', adminController.getEditCoursePage);

module.exports = routes;
