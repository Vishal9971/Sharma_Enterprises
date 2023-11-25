if(process.env.MODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seeds');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./model/User');
const dbURL =
  process.env.dbURL ||
  'mongodb+srv://sharmavis77:7YZFOIgLj496U0mc@cluster0.pjpx546.mongodb.net/?retryWrites=true&w=majority';
const configSession = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, expires: Date.now() + 1000 * 60 * 60 * 7 * 24, maxAge: 7 * 24 * 60 * 60 * 1000 },
};

const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productApi = require('./routes/api/productapi');

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('db ban gaya.');
  })
  .catch((err) => {
    console.log('db nhi bna.', err);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(configSession));
app.use(flash());
//passport ko initialize krra hai aur session ka access diya hai
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// seedDB();

app.get('/', (req, res) => {
  // res.send('server start hai')
  res.send('/products pr dekh bhai chl gya code.');
});

app.use(productRoutes);

app.use(reviewRoutes);

app.use(authRoutes);

app.use(cartRoutes);

app.use(productApi);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server connected at PORT = ${PORT}`);
});
