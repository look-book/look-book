const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const albumSchema = new Schema({
  // title, location, date, cloudinaryId
  title: {
    type: String,
    trim: true,
    required: "Album name is required",
  },
  location: {
    type: String,
    trim: true,
  },
  cloudinaryId: {
    type: String,
    trim: true,
  },
  date: { type: Date, default: Date.now },
});
const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
