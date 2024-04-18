const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

const validateProductInputs = [
  body('type').isIn(['tea', 'extras']),
  body('name').trim().isLength({ min: 5 }),
  body('group').trim().isLength({ min: 5 }),
  body('size').custom((value, { req }) => {
    if (!req.body.color) {
      if (!value || value.trim().length < 3) {
        throw new Error('Size field is incorrect.');
      }
    }
    return true;
  }),
  body('color').custom((value, { req }) => {
    if (!req.body.size) {
      if (!value || value.length !== 2) {
        throw new Error('Color field is incorrect.');
      }
    }
    return true;
  }),
  body('description').trim().isLength({ min: 15 }),
  body('info').trim().isLength({ min: 15 }),
];

router.get('/products', adminController.getProducts);
router.post('/product', validateProductInputs, adminController.postProduct);
router.get('/product/:prodId', adminController.getProduct);
router.put(
  '/product/:prodId',
  validateProductInputs,
  adminController.updateProduct
);
router.delete('/product/:prodId', adminController.deleteProduct);

module.exports = router;
