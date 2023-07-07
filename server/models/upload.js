const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const uploadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    myFile: String,

    authorName: {
      type: ObjectId,
      ref: "User",
    },

    loveCount: {
      type: Number,
      default: 0,
    },
    happyCount: {
      type: Number,
      default: 0,
    },
    scaredCount: {
      type: Number,
      default: 0,
    },
    sadCount: {
      type: Number,
      default: 0,
    },
    angryCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Upload", uploadSchema);
