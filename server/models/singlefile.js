const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    username: {
        type: String,
        required: true,
      },
    categories: {
        type: Array,
        required: false,
      },
    name: {
        type: String,
        required: true
    },
    emotion: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('SingleFile', singleFileSchema);