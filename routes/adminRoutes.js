const express = require('express');
const routes = express.Router();
const path = require('path');
const multer = require('multer');

const coverImageStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/assets/coverImages');
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString()+'-'+file.originalname);
    }
});


const adminController = require('./../controllers/adminController');

routes.use(express.static(path.join(__dirname, '..')));

routes.get('/add-course', adminController.getAddCourse);

// routes.use(multer().single('coverImage'));
routes.post('/add-course', multer({storage: coverImageStorage}).single('coverImage'), adminController.postAddCourse);

module.exports = routes;
