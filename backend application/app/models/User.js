'use strict'
/**  Module Dependencies **/

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true, // index allow mongodb to search this key first and fast
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  }, 
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  mobile: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
  },
  createdOn: {
    type: Date,
    default: ""
  }

})

module.exports = mongoose.model('User', userSchema);