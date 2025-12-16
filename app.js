require('dotenv').config(); // 1. Load biến môi trường ngay dòng đầu tiên
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // 2. Import thư viện CORS

//Thêm swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
var mongoose = require('mongoose');

// Import Models
require('./models/vaccine');

var indexRouter = require('./routes/index');
var vaccineRouter = require('./routes/vaccineRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 3. Cấu hình CORS (Cho phép mọi nơi truy cập - Cần thiết khi deploy)
app.use(cors());

// 4. Connect database (Sử dụng biến môi trường hoặc fallback về localhost)
// Trên Render, bạn sẽ cài đặt biến MONGODB_URI trong phần Environment Variables
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/and103_md20301';

mongoose.connect(dbURI)
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


app.use('/', vaccineRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;