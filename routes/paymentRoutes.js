const express = require('express');
const Router = express.Router();
//We are using request for making an HTTP/HTTPS call to payumoney server
const request = require('request');
const jsSHA = require('jssha');
const { v4: uuid } = require('uuid');
const { isLoggedIn } = require('../middleware');

Router.post('/payment_gateway/payumoney', isLoggedIn, (req, res) => {
  req.body.txnid = uuid(); //Here pass txnid and it should be different
  //  on every call
  req.body.email = req.user.email;
  req.body.firstname = req.user.username;
  //Here save all the details in pay object
  const pay = req.body;
  const hashString =
    process.env.MERCHANT_KEY + //store in in different file
    '|' +
    pay.txnid +
    '|' +
    pay.amount +
    '|' +
    pay.productinfo +
    '|' +
    pay.firstname +
    '|' +
    pay.email +
    '|' +
    '||||||||||' +
    process.env.MERCHANT_SALT; //store in in different file
  const sha = new jsSHA('SHA-512', 'TEXT');
  sha.update(hashString);
  //Getting hashed value from sha module
  const hash = sha.getHash('HEX');

  //We have to additionally pass merchant key to API
  //  so remember to include it.
  pay.key = process.env.MERCHANT_KEY; //store in in different file;
  pay.surl = 'http://localhost:8080/payment/success';
  pay.furl ='http://localhost:8080/payment/fail';
  pay.hash = hash;
  //Making an HTTP/HTTPS call with request
  request.post(
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      url: 'https://sandboxsecure.payu.in/_payment', //Testing url
      form: pay,
    },
    function (error, httpRes, body) {
      if (error) res.send({ status: false, message: error.toString() });
      if (httpRes.statusCode === 200) {
        res.send(body);
      } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
        res.redirect(httpRes.headers.location.toString());
      }
    }
  );
});

// Payment Success URL:
Router.post('/payment/success', (req, res) => {
  res.send(req.body);
});

// Payment Failure URL:
Router.post('/payment/fail', (req, res) => {
 res.send(req.body);
})

module.exports = Router;