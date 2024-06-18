const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

const validateProductInputs = [
  body("type").isIn(["tea", "extras"]),
  body("name").trim().isLength({ min: 3 }),
  body("description").trim().isLength({ min: 15 }),
  body("info").trim().isLength({ min: 15 }),
];

router.get("/products", adminController.getProducts);
router.get("/product/:prodId", adminController.getProduct);
router.post(
  "/product",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "hover", maxCount: 1 },
  ]),
  validateProductInputs,
  adminController.postProduct,
);
router.put(
  "/product/:prodId",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "hover", maxCount: 1 },
  ]),
  validateProductInputs,
  adminController.updateProduct,
);
router.delete("/product/:prodId", adminController.deleteProduct);
router.get("/users", adminController.getUsers);
router.put(
  "/user/:userId",
  [
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
  adminController.updateUser,
);
router.delete("/user/:userId", adminController.deleteUser);

module.exports = router;
