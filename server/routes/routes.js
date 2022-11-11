const express = require('express');
const router = express.Router();
const registerRoute = require('../models/SignUp');
const bcrypt = require('bcryptjs');  //was bcrypt
const initializePassport = require('../models/passport');
const passport = require("passport");
//user, pwd
initializePassport(
  passport,
  email => registerRoute.find(user => user.user === email),
  id => registerRoute.find(user => user.id === id)
);
/*
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
};

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/Login')
};
*/
router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10);
    const passwordSalt = await bcrypt.hash(req.body.password, saltPassword)

    const User = new registerRoute({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: passwordSalt,
        email: req.body.email
    });

    User.save().then(data => { res.json(data) }).catch(err => { res.json(err) });

});


router.post('/Login', passport.authenticate('local', {
  successRedirect: '/Upload',
  failureRedirect: '/app/Login',
  failureFlash: true
}))

router.post("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successful",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  });


  
  


module.exports = router;