const JwtStrategy = require("passport-jwt").Strategy;
const ExractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require(".././config/keys");

const options = {};

options.jwtFromRequest = ExractJwt.fromAuthHeaderAsBearerToken(); // take token from header

options.secretOrKey = keys.secretOrKey ? keys.secretOrKey : "jwtsecretkey"; // secret key

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then(user => {
        if (user) {
          return done(null, user); // end the process with return the user ;
        }
        return done(null, false);
      });
    })
  );
};
