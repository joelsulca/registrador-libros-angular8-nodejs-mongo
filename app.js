var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://joelsulca:elias362@cluster0-hfxcz.mongodb.net/test?retryWrites=true&w=majority')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/registro-libros')));
app.use('/books', express.static(path.join(__dirname, 'dist/registro-libros')));
app.use('/book-details/:id', express.static(path.join(__dirname, 'dist/registro-libros')));
app.use('/book-create', express.static(path.join(__dirname, 'dist/registro-libros')));
app.use('/book-edit/:id', express.static(path.join(__dirname, 'dist/registro-libros')));
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});
app.listen(process.env.PORT || 8080);

module.exports = app;
