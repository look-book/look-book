const express = require('express')
const User = require("../models/users")
const verifyJWT = require("../verifyJWT")
const router = express.Router()
const {upload} = require('../helpers/filehelper');

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
    .catch(err => res.json({
        username: "User Not Found", 
        canEdit: false,
        bio: "",
        
    }))
})

router.post("/updateUserInfo", verifyJWT, upload.single('file'), (req, res) => {
    User.updateOne(
        {username: req.user.username},
        {$set: req.body}, 
        {$set: {bio: req.body.newBio}},  
        { $set: { profilePic: req.body.newImage } },   
        (updateRes) => updateRes
    )
})


//UPDATE
router.put("/user/:userId", verifyJWT, upload.single('file'), async (req, res) => {
    const username = req.params.userId;
    if (req.body.userId === username) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
           req.body.userId,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  });

module.exports = router