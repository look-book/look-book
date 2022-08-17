const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "First Name is Required",
  },

  lastName: {
    type: String,
    trim: true,
    required: "Last Name is Required",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."],
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },

  userCreated: {
    type: Date,
    default: Date.now,
  },

  lastUpdated: Date,

  fullName: String,
});
userSchema.methods.setFullName = function () {
  this.fullName = `${this.firstName} ${this.lastName}`;

  return this.fullName;
};

userSchema.methods.lastUpdatedDate = function () {
  this.lastUpdated = Date.now();

  return this.lastUpdated;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
