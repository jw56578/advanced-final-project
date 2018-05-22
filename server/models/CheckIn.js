var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

  date: Number,
  activityId: Number,
  userId: mongoose.Schema.ObjectId
 
});

module.exports = mongoose.model("CheckIn", schema);
