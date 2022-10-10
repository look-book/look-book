const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  cloudinaryId: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
});
const albumSchema = new Schema({
  // title, location, date, cloudinaryId
  title: {
    type: String,
    trim: true,
    required: "Title name is required",
  },

  images: [imageSchema],

  User: [
    {
      type: Schema.Types.ObjectId,
      ref: "login",
    },
  ],
  tag: [{ type: String }],
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
