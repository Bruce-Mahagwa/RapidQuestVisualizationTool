// dependencies
const express = require("express");
// variables
const router = express.Router();
// functions
const {getNewCustomers, repeatPurchases} = require("../controllers/customerController")

router.get("/new_customers", getNewCustomers);
router.get("/repeat_purchases", repeatPurchases);

module.exports = router;