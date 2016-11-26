const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

mongoose.connect('mongodb://172.31.21.147/event-loop-js');

const dataSchema = new Schema({
  name: String,
  age: {
    type: Number,
    index: true
  },
  ip: String,
  ssn: String,
  countryCode: {
    type: String,
    index: true
  },
  countryName: String,
  image: Buffer
});

exports.Data = mongoose.model('data', dataSchema)