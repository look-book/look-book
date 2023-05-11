const mongoose = require("mongoose");
// Create Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default:""
  },
  verified: { type: Boolean, default: false },
  bio: {
    type: String
  },
  singleFile:[{
    type: mongoose.Types.ObjectId,
    ref: "SingleFile"
  }],
  multipleFiles:[{
    type: mongoose.Types.ObjectId,
    ref: "MultipleFile"
  }],
  uploads: [{
    type: mongoose.Types.ObjectId,
    ref: "Upload"
  }],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "PostMessage",
    },
  ],
  
},{timestamps: true},);

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.PASSPORTSECRET, {
		expiresIn: "7d",
	});
	return token;
};

module.exports = mongoose.model("User", userSchema)



