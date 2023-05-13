const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true,
      },
    username: {
        type: String,
        required: true,
      },
    files: [Object]
}, {timestamps: true});

module.exports = mongoose.model('MultipleFile', mulitipleFileSchema);