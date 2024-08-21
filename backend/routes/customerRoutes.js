// dependencies
const express = require("express");
// variables
const router = express.Router();
// functions
const {getNewCustomers} = require("../controllers/customerController")

router.get("/new_customers", getNewCustomers);

module.exports = router;