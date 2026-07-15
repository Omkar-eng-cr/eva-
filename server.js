const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SITE_URL = process.env.SITE_URL || 'https://www.evatoursandtravels.com';

app.use((req, res, next) => {
  res.locals.business = {
    name: 'Eva Tours and Travels',
    owner: 'Sushil Kale',
    phone1: '9284153392',
    phone2: '9552817420',
    tagline: 'Your City, Your Highway, One Call Away',
    email: 'evatoursandtravels@gmail.com',
    location: 'Pune, Maharashtra'
  };

  res.locals.siteUrl = SITE_URL;
  res.locals.currentPath = req.path;
  next();
});

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});