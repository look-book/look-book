const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //was bcrypt
const User = require("../models/users");
const Upload = require("../models/upload")
const jwt = require("jsonwebtoken");
const {upload} = require("../helpers/filehelper")
const {
  registrationValidation,
  loginValidation,
} = require("../validation/validation");
//if you need to del files after upload
const fs = require('fs');


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
    .then((singleFiles) => res.json(singleFiles))
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
        return res.json({ message: "Invalidemail or Password" });
      }
      bcrypt
        .compare(userLoggingIn.password, dbUser.password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: dbUser._id,
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
            return res.json({ message: "Invalidemail or Password" });
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
  const takenEmail = await User.findOne({email: user.username.toLowerCase()})

  const validationError = registrationValidation(user).error

  if (validationError) {
      return res.json({message: validationError.details[0].message})
  } else if (takenUsername || takenEmail) {
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
          profilePic: user.profilePic,     
          bio: "Hey!" +  user.firstName + " have not set a bio yet",
          singleFile: [],
          multipleFiles: [],
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
        canEdit: dbUser.username == req.user.username,
        canEdit: dbUser.firstName == req.user.firstName,
        canEdit: dbUser.lastName == req.user.lastName,
        canEdit: dbUser.password == req.user.password,
        bio: dbUser.bio,
        profilePic: dbUser.profilePic,
        singleFile: dbUser.singleFile,
        multipleFiles: dbUser.multipleFiles,
        posts: dbUser.posts,
        uploads: dbUser.uploads,
      })
    )
    .catch((err) =>
      res.json({
        username: "User Not Found",
        canEdit: false,
        bio: "",
      })
    );
});

router.get("/updateUserInfo", (req, res) => {
  res.json("updating user information...");
});


router.post("/updateUserInfo", verifyJWT, (req, res) => {
  User.updateOne(
      {username: req.user.username},
      {$set: req.body}, 
      {$set: {bio: req.body.newBio}},  
      { $set:{ profilePic: req.body.newImage } },  
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

/** GET: http://localhost:5000 */
router.get('/uploads', (req, res) => {
  try{
      Upload.find({}).then(data => {
          res.json(data)
      }).catch(error => {
          res.status(408).json({ error })
      })
  }catch(error){
      res.json({error})
  }
})
//if you need to download (after upload) files in cloudinary 
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

router.post('/upload', (req, res, next) => {

    let files = [];    

    async function sendImagesToCloudinary() {
        for (let file of req.files) {
            await cloudinary.uploader.upload(
                file.path,
                {
                    public_id: `${Date.now()}`,
                    resource_type: 'auto'
                }
            ).then(result => {
                //del files after upload on cloudinary
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                files.push(result.file);
            })
            .catch(err => {
                console.log(err);
            });
        }
        res.json(files);
    }

    sendImagesToCloudinary();
});

/** POST: http://localhost:5000/uploads  */
router.post("/uploads", async (req, res) => {
  const body = req.body;
  try{
      const newImage = await Upload.create(body)
      newImage.save();
      res.status(201).json({ msg : "New image uploaded...!"})
  }catch(error){
      res.status(409).json({ message : error.message })
  }
})

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
    res.redirect("https://look-book-act-group42.herokuapp.com/");
  });
});

module.exports = router;
