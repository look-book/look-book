const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //was bcrypt
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const  SENDGRID_API = process.env.SENDGRID_API

const {
  registrationValidation,
  loginValidation,
} = require("../validation/validation");


function verifyJWT(req, res, next) {
  // removes 'Bearer` from token
  const token = req.headers["x-access-token"]?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      req.user.firstName = decoded.firstName;
      req.user.lastName = decoded.lastName;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}


router.get("/isUserAuth", verifyJWT,  (req, res) => {
  return res.json({ isLoggedIn: true, username: req.user.username });
});


router.get("/searchfilter", (req, res) => {
  res.send("Search");
});

router.post("/searchfilter", (req, res) => {
  const searchTerm = req.body.searchTerm;
  Upload.find({ name: { $regex: "" + searchTerm, $options: "i" } })
    .then((upload) => res.json(upload))
    .catch((err) => console.log(err));
});

router.get("/login", (req, res) => {
  res.send("login");
});

router.post("/login", (req, res) => {
  const userLoggingIn = req.body;

  if (!userLoggingIn) return res.json({ message: "Server Error" });

  const validationError = loginValidation(userLoggingIn).error;

  if (validationError) {
    return res.json({ message: validationError.details[0].message });
  } else {
    User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
      if (!dbUser) {
        return res.json({ message: "Invalidusername or Password" });
      }
      bcrypt
        .compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: dbUser._id,
              username: dbUser.username,
              picture: dbUser.picture,
              username: dbUser.username,
              firstName: dbUser.firstName,
              lastName: dbUser.lastName,
            };
            jwt.sign(
              payload,
              process.env.PASSPORTSECRET,
              { expiresIn: 86400 },
              (err, token) => {
                return res.json({
                  message: "Success",
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            return res.json({ message: "Invalidusername or Password" });
          }
        });
    });
  }
});



router.get("/register", (req, res) => {
  res.send("register");
});

router.post("/register", async (req, res) => {
  const user = req.body;
  
  const takenUsername = await User.findOne({username: user.username.toLowerCase()})
  const takenusername = await User.findOne({username: user.username.toLowerCase()})

  const validationError = registrationValidation(user).error

  if (validationError) {
      return res.json({message: validationError.details[0].message})
  } else if (takenUsername || takenusername) {
      return res.json({message: "Username has already been taken"})
  } else {
      user.password = await bcrypt.hash(req.body.password, 10)
      user.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10)
      const dbUser = new User({
          username: user.username,
          password: user.password,
          confirmPassword: user.confirmPassword,
          firstName: user.firstName,
          lastName: user.lastName,   
          picture: user.picture, 
          username: user.username,  
          bio: "Hey!" +  user.firstName + " have not set a bio yet",
          posts:[],
          uploads:[]
      })

      dbUser.save()
      return res.json({message: "Success"})
      
  }
})


router.get("/user/:userId", verifyJWT, (req, res) => {
  const username = req.params.userId;

  User.findOne({ username: username })
    .then((dbUser) =>
      res.json({
        username: dbUser.username,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        password: dbUser.password,
        username: dbUser.username,
        canEdit: dbUser.username == req.user.username,
        canEdit: dbUser.firstName == req.user.firstName,
        canEdit: dbUser.lastName == req.user.lastName,
        canEdit: dbUser.password == req.user.password,
        canEdit: dbUser.bio == req.user.bio,
        canEdit: dbUser.picture == req.user.picture,
        bio: dbUser.bio,
        picture: dbUser.picture,
        posts: dbUser.posts,
        uploads: dbUser.uploads,
      })
    )
    .catch((err) =>
      res.json({
        username: "User Not Found",
        canEdit: false,
        bio: "",
        picture: ""
      })
    );
});

router.get("/updateUserInfo", (req, res) => {
  res.json("updating user information...");
});


router.post("/updateUserInfo", verifyJWT, (req, res) => {
  User.updateOne(
      {username: req.user.username},
      {$set: {bio: req.body.newBio}},  
      { $set:{ picture: req.body.newPicture }},  
      (updateRes) => updateRes
  )
})
     
/** GET: http://localhost:5000 */
router.get("/users", (req, res) => {
  try {
    User.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});


router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
});

router.post("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
});

router.post("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
  });
});

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:SENDGRID_API
  }
}))

router.post('/resetPassword',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({username: req.body.username})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that username"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.username,
                  from:"lookbook@gmail.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="${username}/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your username"})
          })

      })
  })
})


router.post('/new-password',(req,res)=>{
 const newPassword = req.body.password
 const sentToken = req.body.token
 User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
 .then(user=>{
     if(!user){
         return res.status(422).json({error:"Try again session expired"})
     }
     bcrypt.hash(newPassword,12).then(hashedpassword=>{
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser)=>{
            res.json({message:"password updated success"})
        })
     })
 }).catch(err=>{
     console.log(err)
 })
})
module.exports = router;