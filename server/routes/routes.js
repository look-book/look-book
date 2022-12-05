const express = require('express');
const router = express.Router();
const registerRoute = require('../models/SignUp');
const bcrypt = require('bcryptjs');  //was bcrypt
const initializePassport = require('../models/passport');
const passport = require("passport");
//const BlogPost = require("../models/BlogPost");
//const User = require("../models/Login");

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

// router.post('/Login', (req, res) => {
//   console.log("req", req.body);

//   // passport.authenticate('local', {
//   //   successRedirect: '/Upload',
//   //   failureRedirect: '/login/failed',
//   //   failureMessage: true,
//   //   failureFlash: true
//   // });

//   res.json({});
// } );


// router.post("/Login", (req, res) => {
//   passport.authenticate("local",
//       (err, user, options) => {
//         console.log('user', user);
//         console.log('err', err);
//         console.log('options', options);

//         if (user) {
//           // If the user exists log him in:
//           req.login(user, (error)=>{
//             if (error) {
//               res.send(error);
//             } else {
//               console.log("Successfully authenticated");
//               // HANDLE SUCCESSFUL LOGIN 
//               // e.g. res.redirect("/home")
//             };
//           });
//         } else {
//           console.log(options.message); // Prints the reason of the failure
//           // HANDLE FAILURE LOGGING IN 
//           // e.g. res.redirect("/login"))
//           // or
//           // res.render("/login", { message: options.message || "custom message" })
//         };
//   })(req, res)
// });

router.post("/Login", (req, res) => {

  const next = () => {
    res.json({
      msg: "Login was successful"
    });

  }

  passport.authenticate("local", {
    failureRedirect: '/login/failed',
    failureMessage: true,
    failureFlash: true
  })(req, res, next)


});

// router.post('/Login', passport.authenticate('local', {
//   successRedirect: '/Upload',
//   failureRedirect: '/login/failed',
//   failureMessage: true,
//   failureFlash: true
// }));

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});


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

router.post("/fetchUser", (req, res) => {
  const { username } = req.body;
  registerRoute.find({ email: username }).then((data) => {
    console.log('Data:', data);
    res.json(data);
  }).catch((err) => {
    console.log("ERROR: ", err);
  });
});

router.get("/getPosts", (req, res) => {
  BlogPost.find({}).then((data) => {
    console.log('Data:', data);
    res.json(data);
  }).catch((err) => {
    console.log("ERROR: ", err);
  });
});


router.post("/submitPost", (req, res) => {
  const { title, body } = req.body;
  if (title && body && title.length > 0 && body.length > 0) {

    const data = {
      title: title,
      body: body
    }

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((err) => {
      if (err) {
        res.json({
          msg: "Your data failed to save due to error", err
        });
      } else {
        res.json({
          msg: "Your data has been saved!"
        });
      }

    });

  } else {
    res.json({
      msg: "title AND body much be populated to submit a post."
    });
  }

});



module.exports = router;