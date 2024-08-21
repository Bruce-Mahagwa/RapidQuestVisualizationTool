// dependencies
const express = require("express");
// variables
const router = express.Router();
// functions
const {getNewCustomers, repeatPurchases, getGeographicalDistribution, cohortValue} = require("../controllers/customerController")

router.get("/new_customers", getNewCustomers);
router.get("/repeat_purchases", repeatPurchases);
router.get("/geographical_distribution", getGeographicalDistribution)
router.get("/cohortgroup", cohortValue)

module.exports = router;