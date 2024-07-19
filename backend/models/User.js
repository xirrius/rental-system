const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type:String,
    required:true
  },
  profile: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
    min:0, 
  },
}, {timestamps: true});
 
module.exports = mongoose.model('User', userSchema)