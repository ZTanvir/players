const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const playerRoute = require("./controllers/players");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to mongodb");
  })
  .catch((error) => {
    logger.error("Error connecting to mongodb", error.message);
  });

app.use("/api/player", playerRoute);

app.get("/", (req, res) => {
  res.end("<h1>Hello players<h1>");
});

module.exports = app;
