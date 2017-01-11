var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 爬虫
var url = require('url'); //解析操作url
var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var targetUrl = 'http://e.101.com/ndu/2077/5233/learn/home/GetDocInfo?documentId=';  // 安卓性能中间
//var targetUrl = 'http://91like.cn/';

//var id = 113262;
//for(var i = 0 ; i< 12 ; i++){
//
//    superagent.get(targetUrl+id).end(function (err, res) {
//      if (err) {
//        return console.error(err);
//      }
//      var start = res.text.indexOf('http');
//      var end = res.text.indexOf('doc');
//      if(res.text.substring(start,end+'docx'.length).length > 30){
//         console.log(res.text.substring(start,end+'docx'.length));
//      }
//      //var $ = cheerio.load(res.text);
//    });
//    id++;
//}

superagent.get('http://esp-homework-web.pre1.web.nd/')
    .end(function (err, res) {
      console.log(res);
    });
//
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
