const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
  rating:{
    type:Number,
    min:1,
    mac:5,
  },
  comment:{
    type:String,
    trim:true,
    required:true,
  }
},{
  timestamps:true,
});

let Review = mongoose.model('Review',reviewSchema);

module.exports = Review;