const express = require('express');
const routes = express.Router();
const path = require('path');
const multer = require('multer');

const adminController = require('./../controllers/adminController');
const manageCourseRoutes = require('./manageCourseRoutes');

const coverImageStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join('public', 'assets', 'coverImages'));
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.use('/manage-courses', manageCourseRoutes);
routes.get('/add-course', adminController.getAddCourse);
routes.post('/add-course', multer({storage: coverImageStorage}).single('coverImage'), adminController.postAddCourse);
routes.post('/delete', adminController.postDeleteCourse);
routes.get('/', adminController.getAdminHomePage);

module.exports = routes;
