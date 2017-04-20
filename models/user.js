const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
   
    
    mobileno: {
        type: Number,
        required: true
    }
});

const User = module.exports = mongoose.model("angularRegistration", UserSchema);



module.exports.getUserByemail = function(callback) {
    
    User.find(callback);
}

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username }
    User.findOne(query, callback);
}

module.exports.getUserById = function(_id, callback) {
    var query = { _id: _id }
   
    User.findOne(query, callback);
//    console.log(query)
}


module.exports.addUser = function(newuser, callback) {

    bcrypt.genSalt(15, (err, salt) => {
 
        bcrypt.hash(newuser.password, salt, (err, hash) => {
            if (err) {
                 console.log('err');
                console.log(err);
            }
            newuser.password = hash;
            console.log(newuser);
            newuser.save(callback);
//            console.log(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });

}
module.exports.getEmailAlert = function(email, callback) {
    var query = { email: email }
    User.findOne(query, callback);
    console.log(query)

}

module.exports.setpswd = function(newuser, callback) {
//    console.log("@@@@@@@@@@@@@@@@@@@@@@@")
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
            newuser.password = hash;
            callback();

//            console.log(hash)


        });

    });
}