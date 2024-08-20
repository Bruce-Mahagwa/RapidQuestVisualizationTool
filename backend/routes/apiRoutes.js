// variables
const express = require("express");
const app = express();

// files
const salesRoutes = require("../routes/salesRoutes")
const customerRoutes = require("../routes/customerRoutes")

// middleware
app.use("/sales", salesRoutes)
app.use("/customers", customerRoutes)

module.exports = app;