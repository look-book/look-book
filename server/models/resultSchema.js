const mongoose = require("mongoose");
const Schema = mongoose.Schema
/** result model */
const resultModel = new mongoose.Schema({
    username : { type : String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    result : { type : Array, default : []},
    attempts : { type : Number, default : 0},
    points : { type : Number, default : 0},
    achieved : { type : String, default : ''},
    createdAt : { type : Date, default : Date.now}
})

module.exports = mongoose.model('result', resultModel);