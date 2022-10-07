const express = require('express');
const router = express.Router();
const registerRoute = require('../models/SignUp');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => { 
    
    const saltPassword = await bcrypt.genSalt(10);
const passwordSalt = await bcrypt.hash(req.body.password, saltPassword)




    const User = new registerRoute({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        email: passwordSalt
    });

    User.save().then(data =>{res.json(data)}).catch(err => {res.json(err)});

});

module.exports = router;