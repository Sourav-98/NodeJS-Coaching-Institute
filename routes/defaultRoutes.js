// const express = ;
const routes = require('express').Router();
const path = require('path');
const express = require('express');

// routes.get('/login', (req, res)=>{

// });

// routes.get('/signup', (req, res)=>{

// });

// routes.get('/admin-login', (req, res)=>{

// });

routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', (req, res)=>{
    // console.log(req);
    res.render('index', {pageTitle: "Index Page", text: " "});
});
// Home Route - Contains a list of available courses
// routes.use(express.static(path.join(__dirname, '..', 'public/home')));
// routes.get('/:urlText', (req, res)=>{
//     // console.log(req);
//     res.render('index', {pageTitle: "Index Page", text: req.params.urlText});
// });

// //404 Middleware
// routes.get((req, res)=>{

// });

routes.get('/login', (req, res)=>{
    res.render('auth/login', {pageTitle: "Index Page"});
})

module.exports = routes;
