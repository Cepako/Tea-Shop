const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getProducts);
router.post('/product', adminController.postProduct);
router.get('/product/:prodId', adminController.getProduct);
router.put('/product/:prodId', adminController.updateProduct);
router.delete('/product/:prodId', adminController.deleteProduct);

module.exports = router;
