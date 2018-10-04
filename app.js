const express = require('express');
const fs = require('fs');
const request = require('request');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const global = require('global');
const path = require('path');
const favicon = require('serve-favicon');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//use pug
app.set('view engine', 'pug');

//use css
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use('/', routes);

//catch 404 and forward to error handler
app.use(function(req, res, next){
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
  res.render('404', {
    message: err.message,
    error: {}
  });
});

//error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', {
    message: 'Oops! Looks like something went wrong. Make sure that you have imported data and that you have selected data to push to firebase.',
    error: {}
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
