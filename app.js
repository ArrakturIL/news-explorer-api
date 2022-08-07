const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorhandler = require('./middlewares/errorhandler');
const { limiter } = require('./utils/ratelimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundErr = require('./errors/not-found-err');
require('dotenv').config();

const mainRoute = require('./routes');
const { MONGODB_DEV_URL, ERROR_MASSEGES_LIB } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, MONGODB_URL = MONGODB_DEV_URL } = process.env;

const app = express();

mongoose.connect(MONGODB_URL);

app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use('/', mainRoute);

app.get('*', (req, res, next) => {
  next(new NotFoundErr(ERROR_MASSEGES_LIB.RESOURCE_NOT_FOUND));
});

app.use(errorLogger);

app.use(errors());
app.use(errorhandler);

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
