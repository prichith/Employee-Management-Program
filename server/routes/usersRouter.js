const express = require('express')
const route = express.Router()
const userController = require('../controller/userController')
const jwt = require('jsonwebtoken');
const jwtSecret = 'prichith'

// API for users
route.get('/',verifyToken,userController.registerLogin) 
route.post('/api/users',userController.signUp)
route.post('/api/user/otp',userController.otpverification)
route.post('/api/userlogin',userController.userLogin)

//route for buttons 
route.get('/employeeDetails', checkReferrer,(req,res) =>  res.render('employeesDetails'))
route.get('/employees', checkReferrer,(req,res) => res.render('employees'))
route.get('/logout', checkReferrer, userController.logOut)

// middleware to check if the request is from the loggedin pages
function checkReferrer(req,res,next){
    if(
        req.headers.referer && req.headers.referer.includes('/api/userlogin') ||
        req.headers.referer && req.headers.referer.includes('/employeeDetails') ||
        req.headers.referer && req.headers.referer.includes('/employees') ||
        req.headers.referer && req.headers.referer.includes('/')
    ) {
        next();
    }else {
        res.redirect('/')
    }}

    function verifyToken(req, res, next) {
        let token = req.cookies.loginToken
        if (!token) { return res.render("register") }
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) { return res.render("register") }
            req.user = decoded;
            next();
        });
    }
    
module.exports = route