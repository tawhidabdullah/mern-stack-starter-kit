// load PROFILE model
const Profile = require("../models/profile");
const validateProfileInput = require("../validation/profile");

exports.addOrUpdateProfile = (req, res) => {
  console.log(req.body.handle); 
  console.log(req.body.mobile); 
  // bringin the validation items
  const { errors, isValid } = validateProfileInput(req.body);
  // check the validation
  if (!isValid) {
    // REturn any errors with 400 stauts
    res.status(400).json(errors);
    return;
  }
  // Get fields
  const profileFields = {};

  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.birthday) profileFields.birthday = req.body.birthday;
  if (req.body.mobile) profileFields.mobile = req.body.mobile;

  // search the user by loged in user id
  Profile.findOne({ user: req.user }).then(profile => {
    // if we have a profile we are gonna update it
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => {
        res.json(profile);
      });
    }
    // if dont we are gonna create a profile
    else {
      // on doing that we will check if that handle already exist or not
      Profile.findOne({ handle: req.body.handle }).then(profile => {
        if (profile) {
          errors = {};
          errors.handle = "That handle already exist";
          res.status(400).json(errors);
        }

        // if the handle is not exist then create a new profile with the given data
        new Profile(profileFields)
          .save()
          .then(profile => res.json(profile))
          .catch(err => res.status(404).send("some thing went wrong"));
      });
    }
  });
};

exports.getCurrentProfile = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(current_user => {
      if (!current_user) {
        errors.noProfile = "There is no profile for the user";
      return  res.status(404).json(errors);
      }
      res.json(current_user); // send current_user to the client
    })
    .catch(error => {
      res.status(404).json(error);
    });
};
