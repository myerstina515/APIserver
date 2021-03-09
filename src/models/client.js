'use strict';

const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
  name: {type: String, required: true},
  emailAddress: {type: String, required: false},
  phoneNumber: {type: Number, required: false},
  trainingType:{type: String, required: false},
  injury: {type: String, required: false},
  goals: {type: String, required: false},
  message: {type: String, required: false}
})

const clientModel = mongoose.model('client', clientSchema);

module.exports = clientModel;