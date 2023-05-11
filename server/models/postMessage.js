const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    message: {
         type: String
    },
    creator: {type: String
    },

    tags: [String],
    selectedFile: String,

    likeCount: {
        type: Number,
        default: 0,
    },
},{timestamps: true},);

module.exports = mongoose.model("PostMessage", postSchema);
