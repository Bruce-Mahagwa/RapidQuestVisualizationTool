// dependencies
const express = require("express");
// variables
const router = express.Router();
// functions
const {getSalesOverTime} = require("../controllers/salesController")

router.get("/sales_over_time", getSalesOverTime);


module.exports = router;