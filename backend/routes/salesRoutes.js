// dependencies
const express = require("express");
// variables
const router = express.Router();
// functions
const {getSalesOverTime, salesRate} = require("../controllers/salesController")

router.get("/sales_over_time", getSalesOverTime);
router.get("/sales_rate", salesRate);


module.exports = router;