const mongoose = require("mongoose");
// Create Schema
const userSchema = new mongoose.Schema(
  {
    userId: String,
    access_token: String,
    picture: String,
    name: {
      type: String,
    },
    email: {
      type: String
    },
    facebookId: {
      type: String
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },

    profilePic: String,

    verified: { type: Boolean, default: false },
    bio: {
      type: String,
    },

    uploads: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Upload",
      },
    ],
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PostMessage",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.PASSPORTSECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
