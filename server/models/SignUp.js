const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signUp = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },    
    email:{
        type:String
    },
    password:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('login', signUp);