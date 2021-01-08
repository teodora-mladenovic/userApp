const express = require('express');
const router = express({ margeParams: true });
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
var config = require('../config');
const fs = require('fs');


router.get('/', (req, res, next) => {
    User.find().select(['email', 'id', 'loginCount', 'isAdmin']).then((result) => {
        res.status(200).json({ 'users': result });
    }).catch((err) => {
        res.status(500).json({ 'message': 'Internal server error', 'error': err });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    
    User.findOne({ _id: id}).exec(function(err, user){
            if (user){
            res.status(200).json({'users': user});
            }
            else {
                res.status(500).json({ 'message': 'Internal server error', 'error': err });
            }
          });
           

});






router.post('/register', (req, res, next) => {
    
    const email = req.body.email || "";
    const password = req.body.password;
    const password2 = req.body.password2;
    const loginCount = req.body.loginCount || 0;
    const isAdmin = req.body.isAdmin || false;


    if (email == "") {
        res.status(500).json({ 'message': 'No e-mail address' });
    }
    else {
        User.findOne({ email: email }).exec(function (err, user) {
            if (user) {
                res.status(500).json({ 'message': 'user exist already' });
            } //user already exists with email.
            else {
                if (password === password2) {

                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            res.status(500).json({ 'message': 'error', 'error': err });
                        } else {
                            var emailValidation = email.includes('@');
                            var lengthNum = 8;
                            if (!emailValidation) {
                                res.status(500).json({ 'message': 'e-mail is not in valid format' });
                            } else if (password.length < lengthNum) {
                                res.status(500).json({ 'message': 'password is too short, try with 8 characters' });
                            } else {
                                User.create({
                                    _id: new mongoose.Types.ObjectId(),
                                    email: email,
                                    password: hash,
                                    loginCount: loginCount,
                                    isAdmin: isAdmin
                                }).then(result => {
                                    res.status(201).json({ 'message': 'success', 'user': { '_id': result._id } });
                                }).catch(err => {
                                    res.status(403).json({ 'message': 'Bad request', 'error': err });
                                })
                            }
                        }
                    });
                } else {
                    res.status(500).json({ 'message': 'Confirmation of password is not right' });
                }

            } //no users with that email  exist.
        });
    }

});



router.post('/login', (req, res, next) => {
    const email = req.body.email || "";
    const password = req.body.password || "";
    if (email == "" || password == "") {
        if (email == "") {
            res.status(500).json({ 'message': 'Enter your email address' });
        } else {
            res.status(500).json({ 'message': 'Enter your password' });
        }
    } else {

        User.findOne({ email: email }).exec(function (err, user) {
            if (user) {

                bcrypt.compare(password, user.password, (err, result) => {
                    if (!result) {
                        res.status(500).json({ message: 'incorrect password', error: err });
                    }
                    else {
                        updatedLoginCount = user.loginCount + 1;
                        myquery = { email: user.email };
                        newvalues = { $set: { loginCount: updatedLoginCount} };
                        
                        User.updateOne(myquery, newvalues, function (err, result) { 
                           //console.log(user.loginCount);
                        });

                        

                        var token = jwt.sign({ id: user._id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                        });

                        res.status(200).json({
                             user:
                            {
                                _id: user._id,
                                email: user.email,
                                loginCount: user.loginCount,
                                isAdmin: user.isAdmin
                            }
                        });


                    }

                });
            } 
            else {
                res.status(500).json({ 'message': 'There is no user with this email' });
            } 
        });
    }
    


});






module.exports = router;