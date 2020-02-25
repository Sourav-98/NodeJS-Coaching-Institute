const express = require('express');
const routes = express.Router();
const path = require('path');

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/add-course', (req, res)=>{
    res.render('admin/add-course', {pageTitle:"Add New Course", pagePath:'/admin/add-course'});
});

module.exports = routes;
