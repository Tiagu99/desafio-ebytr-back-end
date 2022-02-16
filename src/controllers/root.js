const express = require("express");

const root = express.Router({ mergeParams: true });

root.use('/task', require('./task/router'));

module.exports = root;
