const mongoose = require("mongoose");
// Create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
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
