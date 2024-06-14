const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const multer = require("multer");
const upload = multer();

const User = require("../models/user");

const router = express.Router();

router.put(
  "/signup",
  upload.none(),
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must contain min 5 characters."),
    body("contact")
      .trim()
      .isLength({ min: 15, max: 15 })
      .withMessage("Number is incorrect."),
    body("address")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Address is incorrect."),
    body("name").trim().not().isEmpty().withMessage("Name could not be empty."),
  ],
  authController.signup,
);
router.post("/login", upload.none(), authController.login);

module.exports = router;
