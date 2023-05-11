const express = require('express')
const bcrypt = require("bcrypt")
const User = require("../models/users")
const verifyJWT = require("../verifyJWT")
const jwt = require("jsonwebtoken")
const {registrationValidation, loginValidation } = require("../validation/validation")
const router = express.Router()


router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({isLoggedIn: true, username: req.user.username})
})

router.post("/login",(req, res) => {
    
    const userLoggingIn = req.body;

    if (!userLoggingIn) return res.json({message: "Server Error"})

    const validationError = loginValidation(userLoggingIn).error

    if (validationError) {
        return res.json({message: validationError.details[0].message})
    } else {
        User.findOne({username: userLoggingIn.username.toLowerCase()})
        .then(dbUser => {
            if (!dbUser) {
                return res.json({message: "Invalid username or Password"})
            }

            bcrypt.compare(userLoggingIn.password, dbUser.password)
            .then(isCorrect => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                        firstName: dbUser.firstName,
                        lastName: dbUser.lastName,
                    }
                    jwt.sign(
                        payload, 
                        process.env.PASSPORTSECRET,
                        {expiresIn: 86400},
                        (err, token) => {
                            return res.json({message: "Success", token: "Bearer " + token})
                        }
                    )
                    
                } else {
                    return res.json({message: "Invalid username or Password"})
                }
            })

        })
    }
})

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
});

module.exports = router