const express = require('express');
const Product = require('../model/Product');
const Review = require('../model/Review');
const { productValidation, isLoggedIn, isSeller, isAuhtor } = require('../middleware');
const { showAllProduct, productForm, showProduct, editForm, editedProduct, deleteProduct, createProduct } = require('../controllers/Product');
const Router = express.Router();

Router.get('/products', showAllProduct);

Router.get('/products/new', isLoggedIn, isSeller,productForm);

Router.post('/products',productValidation, createProduct)

Router.get('/products/:id/show',showProduct);

Router.get('/products/:id/edit', isLoggedIn, isAuhtor, editForm);

Router.patch('/products/:id',productValidation, editedProduct);

Router.delete('/products/:id', isLoggedIn, isAuhtor, deleteProduct );

module.exports = Router;
