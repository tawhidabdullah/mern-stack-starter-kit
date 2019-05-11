const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// import models

const Profile = require("../models/profile");
// relative file import
const keys = require(".././config/keys");

// load input register  validation
const validateRegisterInput = require(".././validation/registration");

// load input login validation
const validateLoginInput = require(".././validation/login");

// creat user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// with user schema , load the user model for User collection
const User = mongoose.model("users", userSchema);

// REGISTER USER /////////////////////////////////////////////////////////////////////
exports.registerUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // check validation of client and sever // REGISTER FORM
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // check if the user has already an account or not
  // if has return error
  // other wise create a new user in the database
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      const { name, email, password } = req.body;
      let isAdmin = false;

      const avatar = gravatar.url(req.body.email, {
        // decleare the avatar or setting the avatar
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });

      if (password === keys.adiminKey) {
        isAdmin = true;
      }

      const newUser = new User({
        // create new user in the data base document
        name,
        email,
        avatar,
        isAdmin,
        password
      });

      // in bcrypt first we will pass our normal password as first argument
      // then in the seconde argument we will be specified how many times the bcrypt we will be hash
      // then => after that it will return a call back fucntion
      // on that call back function thkbe either error or our hash password

      bcrypt.hash(newUser.password, 12, (err, hash) => {
        // if error then =>>
        if (err) {
          return res.status(500).json({
            message: "Server Error occurd"
          });
        }

        // other wise =>
        newUser.password = hash; // setting hash to our password

        // save the user to database and send the response
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => res.json(err));
      });
    }
  });
};

// LOGIN USER ////////////////////////////////////////////////////////////////

exports.loginUser = (req, res) => {
  // VALIDATE EMAIL AND PASSWORD

  // returns erros objects and isvalid boolea /////////////////
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
    return;
  }

  const { email, password } = req.body; // get the password and email

  // find the user by EMAIL
  User.findOne({
    email
  }).then(user => {
    // check for user wheather user is in the database or not
    if (!user) {
      errors.email = "User not found";
      // send not found user as a response
      return res.status(404).json(errors);
    }

    // if user exist in the database then CHECK FOR PASSWORD
    // CHECK FOR PASSWORD
    bcrypt
      .compare(password, user.password) // compare will return us a true of false value
      .then(isMatch => {
        // if password matches ==>> send "success"
        if (isMatch) {
          //User MATCH
          const payload = {
            id: user.id,
            name: user.name,
            isAdmin: user.isAdmin,
            avatar: user.avatar // CREATE JWT PAYLOAD
          };

          // ASIGN THE TOKEN
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 100009
            },
            (err, token) => {
              res.json({
                loginSuccess: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          res.status(400).json(errors);
        }
      })
      .catch(() => {});
  });
};

/// GET CURRENT USER /////////////////////////////////////////////////////////////////
exports.getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
};

// token authentication login ======//////////////////////////////////////==>>>

// first when a user get's loged in , we asign a token to then by ===>>> jwt ;
// so
// because when a user try to access in a private routes, they have show us that token ,
// and we will validate , if they has any token or not
// and we will do that authenticate by ===>> passport , passport-jwt strategy

// on the example , we can see that when a user send a request to current / route ,
// which is a private routes, because it is a private route so ,,
// we told passport to authenticate that request by == jwt strategy
