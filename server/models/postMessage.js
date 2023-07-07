const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    message: {
         type: String
    },
    creator: { 
        type:ObjectId,
        ref:"User"
    },
    
    age: {
        type: Number
   },

    tags: [String],
    selectedFile: String,

    likeCount: {
        type: Number,
        default: 0,
    },
},{timestamps: true},);

module.exports = mongoose.model("PostMessage", postSchema);
