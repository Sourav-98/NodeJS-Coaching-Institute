const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//routes import
const AdminRoutes = require('./routes/adminRoutes');
const StudentRoutes = require('./routes/studentRoutes');
const AuthRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:'j2b3v543yb3hg43vu&%Gbv&IRFt5&^wqfoo9a8&G^FQ#VYCe', saveUninitialized: false, resave:false, useFindAndModify: false}));

app.use(AuthRoutes);
app.use(StudentRoutes);
app.use('/admin', AdminRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    if(req.session.isLoggedIn !== true){
        res.render('index', {pageTitle: "courseRus.com", pagePath:"/", session_data: req.session});    // render a common index page
    }
    else{
        if(req.session.mode == "student"){
            res.render('student/home', {pageTitle: "Home", pagePath:"/", session_data: req.session});
        }
        else{
            res.redirect('/admin');
        }
    }
});

app.use((req, res)=>{
    res.render('includes/404', {pageTitle: "404", pagePath:"404", session_data: req.session})
});

app.listen(9000);

mongoose.connect('mongodb://courserus_mongo:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to Database!');

})
.catch((err)=>{
    console.log('Error in connecting to database!');
});
