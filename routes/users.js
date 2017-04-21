var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcryptjs');
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
                        username: user.username,
                        email: user.email,
                        mobileno:user.mobileno
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        })
    });
});
//get employee list
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
//Update emp detials
    router.post('/updateemp/:id',(req,res,next)=>{
//   console.log(req.params.id)
    var newuser = new User({
        username: req.body.username,
        email: req.body.email,
        mobileno: req.body.mobileno
    
    });
    console.log(newuser)
    console.log(newuser._id)
    User.update({ _id:req.params.id }, { $set: { username:newuser.username,email:newuser.email,mobileno:newuser.mobileno } },function(err,docs){
        if(err){
            throw err;
        }
        else{
            res.json({ success: true, msg: 'updated successfully' });
        }
    })
    
})//router

//delete emp
  router.post('/removeemp/:id',(req,res,next)=>{
    User.remove({ _id:req.params.id },function(err,docs){
        if(err){
            throw err;
        }
        else{
            res.json({ success: true, msg: 'Deleted successfully' });
        }
    })
    
})

//change password
router.post('/changepswd/:id',(req,res,next)=>{
    const oldpassword = req.body.oldpswd;
    const newpassword = req.body.npswd;
//    const confirmpassword = req.body.newconpswd;
    
//     var newuser = new User({
//            oldpassword: req.body.oldpswd,
//            newpassword: req.body.npswd,
//            confirmpassword: req.body.newconpswd
//        });
    
    User.getUserById(req.params.id, (err, user) => {
        console.log(oldpassword)
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User Not Found' });
        }
        
        User.comparePassword(oldpassword, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                console.log(oldpassword)
                if(req.body.npswd==req.body.newconpswd){
                    console.log("passwor correct")
                     User.setpswd(req.params.id,newpassword, (err, data) => {
                     
                          //console.log(data)
              if (err) {
                res.json({ success: false, msg: 'User not updated' });
                 } else {
                   res.json({ success: true, msg: 'password updated Successfully' });
                        }

                   
                     })
             
                }else{
                     console.log("passwor wrong")
                    res.json({
                    success: true, msg:"Password not matched..." })
                    
                }
                

            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        })
    
    
    })
   
    
})

module.exports = router;
