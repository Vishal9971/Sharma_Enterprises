const Product = require("../model/Product");
const Review = require('../model/Review');


const showAllProduct = async (req, res) => {
  let allProducts = await Product.find({});
  res.render('product/index', { allProducts });
};

const productForm =(req,res)=>{
  res.render('product/new');
};
const createProduct = async (req, res) => {
  let { name, img, price, des } = req.body;
  await Product.create({ name, img, price, des, author: req.user._id });
  res.redirect('/products');
};

const  showProduct =  async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Product.findById(id).populate('review');
  res.render('product/show', { foundProduct });
};

const  editForm =  async (req, res) => {
  let { id } = req.params;
  let foundProduct = await Product.findById(id);
  res.render('product/edit', { foundProduct });
} ;

const editedProduct = async (req, res) => {
  let { id } = req.params;
  let { name, img, price, des } = req.body;
  await Product.findByIdAndUpdate(id, { name, img, price, des });
  res.redirect('/products');
};

const deleteProduct = async (req, res) => {
  let { id } = req.params;
  let product = await Product.findById(id);
  for (let ID of product.review) {
    await Review.findByIdAndDelete(ID);
  }
  await Product.findByIdAndDelete(id, {});
  res.redirect('/products');
};

module.exports = {showAllProduct,productForm,createProduct,showProduct,editForm,editedProduct,deleteProduct};