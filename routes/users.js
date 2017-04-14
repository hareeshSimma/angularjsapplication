var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// Register router
router.post('/register', (req, res, next) => {
    console.log('req.body.mobile');
    console.log(req.body);
    
    var mob=parseInt(req.body.mobile);
    var newuser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobileno: mob
       
      
    });

    User.addUser(newuser, (err, data) => {
     
        if (err) {
//            res.json({ success: false, msg: 'Failed to register user' });
       throw err;
        } else {
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@")

            const mobileno = req.body.mobile;
            var accountSid = 'AC5096603a6381e71df49a65ff7a57c02c';
            var autToken = 'ba3451e5b1dfe9fd1bfeb6be4d01b3ce';

            var client = require('twilio')(accountSid, autToken);
            client.messages.create({
                to: '+91' + mobileno,
                from: '7146768946',
                // body: 'na chavu nenu chasta niku enduku bey!.dikkulu chudakunda pani chusko'
                body: 'Hi' + req.body.username + 'Welcome to XXXXXXXX . Registration successfully. Enjoy the services......'
            }, function(err, message) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(message);
                }

            })
            res.json({ success: true, msg: 'User Registered Successfully' })


        }
    });



});

// Authentication router
router.post('/authenticate', (req, res, next) => {
    const username = req.body.uname;
    const password = req.body.pswd;
console.log(req.body)
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User Not Found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.uname,
                        
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        })
    });
});

router.get('/emplist', (req, res, next) => {

    User.getUserByemail((err, data) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(data)
        if (err) {
            res.json({ success: false, msg: 'Not get any users' });
        } else {

            res.json({ success: true, msg: 'User found Successfully', data: data })
        }

    });



});


module.exports = router;
