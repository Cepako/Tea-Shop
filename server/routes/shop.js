const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/teas", shopController.getTeas);
router.get("/extras", shopController.getExtras);

module.exports = router;
