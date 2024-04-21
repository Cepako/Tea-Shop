const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('E-mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password must contain min 5 characters.'),
    body('name').trim().not().isEmpty().withMessage('Name could no be empty.'),
  ],
  authController.signup
);
router.post('/login', authController.login);

module.exports = router;
