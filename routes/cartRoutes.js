const express = require('express');
const { isLoggedIn } = require('../middleware');
const Product = require('../model/Product');
const User = require('../model/User');
const Router = express.Router();

Router.get('/user/cart', isLoggedIn, async (req, res) => {
  let user = await User.findById(req.user._id).populate('cart');
  const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  const productInfo = user.cart.map((p) => p.des).join(',');
  res.render('cart/cart', { user, totalAmount, productInfo });
});

Router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
  let { productId } = req.params;
  let userId = req.user._id;
  let product = await Product.findById(productId);
  let user = await User.findById(userId);
  user.cart.push(product);
  await user.save();
  res.redirect('/user/cart');
});

module.exports = Router;
