const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, password, contact, address, name } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email,
        password: hashedPw,
        name,
        contact,
        address,
      });
      return user.save();
    })
    .then((user) => {
      res.status(201).json({ message: "User created!", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, loadedUser.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
          role: loadedUser.role,
        },
        "123kop456",
        { expiresIn: "1h" },
      );
      res.status(200).json({
        message: "Logged in",
        token: token,
        userId: loadedUser._id.toString(),
        email: loadedUser.email,
        role: loadedUser.role,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
