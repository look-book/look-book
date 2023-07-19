const mongoose = require("mongoose");
// Create Schema
const userSchema = new mongoose.Schema(
  {
    userId: String,
    picture: {
      type: String, 
      default: "https://img.freepik.com/premium-photo/neon-iridescent-psychedelic-cat-generative-ai-based-any-actual-scene-pattern_108146-4007.jpg?w=1480"
    },
    hashedPassword: {
      type: String,
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
    email: {
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
