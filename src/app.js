// ENV setting
import '../env/env'

import model from './api/mysql.model.index'
import { routes } from './api';

import { logger, stream } from './utils/winstonLogger';

var createError = require('http-errors');

// module
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// Routing
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');


//log color
const errMessageColor = '\x1b[33m%s\x1b[0m';

// console.log(JSON.stringify(process.env.DB_SYNC))
// console.log(process.env.DB_SYNC)
/* Sequelize mysql init */
if (process.env.DB_SYNC && process.env.DB_SYNC === 'true') {
  model.sequelize
    //프로젝트 내에 모델 등록
    .sync()
    .then((e) => {
      console.log('Sequelize Success');
    })
    .catch((err) => {
      console.log('Sequelize Error : ', err); 
    });
} else {
  console.log('not sync');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use -> middleware register method
app.use('/', indexRouter);
app.use('/user', userRouter);

// Router need
routes.forEach((route) => {
  app[route.method](route.path, [...route.beforeService], route.controller, [...route.afterService]);
  // console.log(app[route.method](route.path, [...route.beforeService], route.controller, [...route.afterService]))
  // console.log(route)
  // if (route.file){
  //   console.log(1)
  // app[route.method](
  //   route.path,
  //   [
  //     ...route.middleware,
  //     // route.file === 'single'
  //     //   ? upload.single('file')
  //     //   : upload.array('files', 10),
  //   ],
  //   route.controller
  //   );}
  // else app[route.method](route.path, [...route.middleware], route.controller);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// error handler
app.use(function(err, req, res, next) {
  if (err) {
    logger.error(`[Backend Error Log] Error: ${err.message}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(errMessageColor, '----------------------------------------');
      console.log('Error Message: \x1b[33m%s\x1b[0m', err.message);
      // console.log('Full Error Message : ', err);
      console.log(errMessageColor, '----------------------------------------');
    }
  }

  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals 를 이용하면 view 단의 html error에서 변수 사용가능

  res.status(err.status || 500).send({
    status: err.status || 500,
    error: err,
  });
  // res.render('error'); to use this you have to remove send()
});

module.exports = app;
