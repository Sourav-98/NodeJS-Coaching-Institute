const express = require('express');
const routes = express.Router();
const path = require('path');
const multer = require('multer');

const adminController = require('./../controllers/adminController');

const coverImageStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join('public', 'assets', 'coverImages'));
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', adminController.getManageCoursesPage);
routes.get('/:course_id', adminController.getEditCoursePage);
routes.post('/:course_id', multer({storage: coverImageStorage}).single('coverImage'), adminController.postEditCourse);

module.exports = routes;
