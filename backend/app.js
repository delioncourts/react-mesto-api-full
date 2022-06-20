const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger'); 

const app = express();
const bodyParser = require('body-parser');
const { validateLogin, validateUser } = require('./utils/validation');
const { login, createUsers } = require('./controllers/users');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');

const { ERROR_SERVER } = require('./utils/const');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUsers);

app.use(auth);

app.use('/', users);
app.use('/', cards);

app.use((req, res, next) => {
  next(new NotFoundError('К сожалению, запращиваемый ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  const errorMessage = (statusCode === ERROR_SERVER) ? 'Ошибка на сервере' : message;
  res.status(statusCode).send({ message: errorMessage });
  next();
});

app.listen(PORT);
