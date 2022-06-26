const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { STATUS_OK, STATUS_CREATED } = require('../utils/const');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неверная почта или пароль')));
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(STATUS_OK).send(users);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные id'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => next(err));
};

const createUsers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Данный email уже зарегистрирован'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные пользователя'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные пользователя'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) =>  res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные пользователя'));
      }
      return next(err);
    });
};

module.exports = {
  login, getUsers, getUserById, createUsers, updateUser, updateAvatar, getCurrentUser,
};
