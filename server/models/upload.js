const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  myFile: String,
});

module.exports = mongoose.model("Upload", uploadSchema);
