const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  des: {
    type: String,
    trim: true,
  },
  price:{
    type:Number,
    required:true,
    min:0,
  },
  review:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Review',
  }],
  avgRating:{
    type:Number,
    default:0
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  }
});

let Product = mongoose.model('Product',productSchema);

module.exports=Product;