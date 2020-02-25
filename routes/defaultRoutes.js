// Home Route - Contains a list of available courses
const express = require('express');
const routes = express.Router();
const path = require('path');


routes.use(express.static(path.join(__dirname, '..', 'public')));

routes.get('/', (req, res)=>{
    res.render('index', {pageTitle: "Index Page", text: " "});
});


routes.get('/login', (req, res)=>{
    res.render('auth/login', {pageTitle: "Login"});
});

routes.get('/signup', (req, res)=>{
    res.render('auth/signup', {pageTitle: "Signup"})
});

module.exports = routes;
