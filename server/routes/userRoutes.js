const express = require('express')
const User = require("../models/users")
const verifyJWT = require("../verifyJWT")
const router = express.Router()

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
        canEdit: dbUser.bio == req.user.bio,
        canEdit: dbUser.picture == req.user.picture,
        bio: dbUser.bio,
        picture: dbUser.picture,
        posts: dbUser.posts,
        uploads: dbUser.uploads,
      })
    )
    .catch(err => res.json({
        username: "User Not Found", 
        canEdit: false,
        bio: "",
        picture: "",
        
    }))
})

router.post("/updateUserInfo", verifyJWT, (req, res) => {
    User.updateOne(
        {username: req.user.username},
        {$set: {bio: req.body.newBio}},  
        { $set: { picture: req.body.newPicture } },   
        (updateRes) => updateRes
    )
})

module.exports = router