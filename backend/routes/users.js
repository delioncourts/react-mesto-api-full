const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const { validateUpdateUser, validateUserId, validateAvatar } = require('../utils/validation');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
