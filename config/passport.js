var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user');
const config = require('./database');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    opts.passReqToCallBack = true;
    passport.use(new JwtStrategy(opts, (req, jwt_payload, done) => {
        console.log(jwt_payload);
        console.log(done);
        User.getUserById(jwt_payload._doc_id, (err, user) => {
            console.log(done);
            if (err) {
                console.log("err");
                return done(err, false);
            } else if (user) {
                console.log("zklckzcklzkczjk");
                return done(null, user);
            } else {
                console.log("jfksjfksjf")
                return done(null, false);
            }
        });
    }));

}