const express = require('express');
const routes = express.Router();
const path = require('path');
const multer = require('multer');

const manageCourseRoutes = require('./manageCourseRoutes');
const coverImageStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join('public', 'assets', 'coverImages'));
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});


const adminController = require('./../controllers/adminController');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.use('/manage-courses', manageCourseRoutes);
routes.get('/add-course', adminController.getAddCourse);
routes.get('/', adminController.getAdminHomePage);
// routes.use(multer().single('coverImage'));
routes.post('/add-course', multer({storage: coverImageStorage}).single('coverImage'), adminController.postAddCourse);

module.exports = routes;
