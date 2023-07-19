const asyncHandler = require('express-async-handler');
const User = require('../models/users');
const verifyJWT = require('../verifyJWT');

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, password, confirmPassword, picture } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    userExists.firstName = firstName || userExists.firstName;
    userExists.lastName = lastName || userExists.lastName;
    userExists.username = username || userExists.username || username;
    userExists.picture = picture || userExists.picture
    userExists.password = password || userExists.password;
    userExists.confirmPassword = confirmPassword || userExists.confirmPassword

    const user = await userExists.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        picture: user.picture,
        token: generateToken(user._id),
      });
    }
  } else {
    const user = await User.create({
      firstName,
      lastName,
      username,
      picture,
      password,
      confirmPassword
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        picture: user.picture,
        token: verifyJWT(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      picture: user.picture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

module.exports = { loginUser, registerUser };
