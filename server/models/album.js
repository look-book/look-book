const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const albumSchema = new Schema({
  // title, location, date, cloudinaryId
  title: {
    type: String,
    trim: true,
    required: "Title name is required",
  },
  tag: {
    type: String,
    trim: true,
  },
  path: {
    type: String,
    trim: true,
  },
  cloudinaryId: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
  },
  isFavorite: {
    type: Boolean,
  },

  created_at: { type: Date, default: Date.now },
});
const Album = mongoose.model("Album", albumSchema);
module.exports = Album;
