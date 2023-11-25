const mongoose = require('mongoose');
const { productSchema, reviewSchema } = require('./schema');
const Product = require('./model/Product');

const productValidation = (req, res, next) => {
  let { name, img, des, price } = req.body;
  const { error } = productSchema.validate({ name, img, des, price });
  if (error) {
    return res.render('/error', { error });
  }

  next();
};

const reviewValidation = (req, res, next) => {
  let { rating, comment } = req.body;
  const { error } = reviewSchema.validate({ rating, comment });
  if (error) {
    return res.render('/error', { error });
  }

  next();
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated) {
    req.flash('error', 'please login first');
    return res.redirect('/login');
  }
  next();
};

const isSeller = (req, res, next) => {
  if (!req.user.role) {
    req.flash('error', 'you donot have access');
    return res.redirect('/products');
  } else if (req.user.role !== 'seller') {
    req.flash('error', 'you donot have access');
    return res.redirect('/products');
  }
  next();
};

const isAuhtor = async(req,res,next)=>{
  let {id} = req.params;
  let foundProduct = await Product.findById(id);
  if(!foundProduct.author.equals(req.user._id)){
    req.flash('error', 'you donot have access');
    return res.redirect('/products');
  }
  next();
}


module.exports = { productValidation, reviewValidation, isLoggedIn, isSeller, isAuhtor };
