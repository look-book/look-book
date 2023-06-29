const mongoose = require("mongoose");

/** question model */
const questionModel = new mongoose.Schema({
    questions: { 
        type : Array, default: [],}, // create question with [] default value
    
    answers : { type : Array, default: []},
    createdAt: { type: Date, default: Date.now },
});

module.exports =  mongoose.model('Question', questionModel);