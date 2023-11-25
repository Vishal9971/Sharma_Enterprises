const express = require('express');
const Product = require('../model/Product');
const Review = require('../model/Review');
const { reviewValidation } = require('../middleware');
const Router = express.Router();

Router.post('/products/:id/review', reviewValidation, async (req, res) => {
  let { id } = req.params;
  let { rating, comment } = req.body;
  let product = await Product.findById(id);
  let newReview = new Review({ rating, comment });
  await newReview.save();
  product.review.push(newReview);
  await product.save();
  // res.redirect(`/products/${id}`);
  res.redirect(`/products`);
});

module.exports = Router;
