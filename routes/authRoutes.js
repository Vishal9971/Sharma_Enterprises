const express = require('express');
const User = require('../model/User');
const Passport = require('passport');
const Router = express.Router();

Router.get('/register', (req, res) => {
  res.render('user/signup');
});

Router.post('/register', async (req, res) => {
  try {
    let { username, password, email, role } = req.body;
    let newUser = new User({ email, username, role });
    await User.register(newUser, password);
    req.flash('success', 'register successfully');
    req.login(newUser, function (err) {
      req.flash('success', 'Welcome, You are registed successfully');
      return res.redirect('/products');
    });
  } catch (e) {
    req.flash('error', e.message);
    return res.redirect('/signup');
  }
  // res.redirect('/login');
});

Router.get('/login', (req, res) => {
  res.render('user/login');
});

Router.post(
  '/login',
  Passport.authenticate('local', { failureRedirect: '/login', faliureMessage: true }),
  (req, res) => {
    req.flash('success', 'Welcome Back');
    res.redirect('/products');
  }
);

Router.get('/logout', (req, res) => {
  req.logout(function () {
    req.flash('success', 'logout successfully');
    res.redirect('/login');
  });
});

module.exports = Router;
