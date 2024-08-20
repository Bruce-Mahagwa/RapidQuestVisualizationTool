// variables
const express = require("express");
const app = express();

// files
const salesRoutes = require("./salesRoutes")
const customerRoutes = require("./customerRoutes")

// middleware
app.use("/sales", salesRoutes)
app.use("/customers", customerRoutes)

module.exports = app;