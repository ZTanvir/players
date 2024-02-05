const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hello players<h1>");
});

module.exports = app;
