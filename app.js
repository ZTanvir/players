const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const playerRoute = require("./controllers/players");

app.use(express.json());
app.use("/api/player", playerRoute);

app.get("/", (req, res) => {
  res.end("<h1>Hello players<h1>");
});

module.exports = app;
