const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:  {
        type: String, // String is shorthand for {type: String}
        trim: true, //take out space beginning and end
        required: true
    },
    email: {
        type: String, // String is shorthand for {type: String}
        trim: true, //take out space beginning and end
        required: true
    },
    password: {
        type: String, // String is shorthand for {type: String}
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
  });

  module.exports = User = mongoose.model("users", UserSchema);