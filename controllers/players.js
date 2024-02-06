const playerRoute = require("express").Router();
const Player = require("../models/player");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");

playerRoute.get("/", async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (error) {}
});

playerRoute.get("/:id", async (req, res) => {
  const playerId = request.params.id;
  try {
    const player = await Player.findById(playerId);
    res.json(player);
  } catch (error) {}
});

module.exports = playerRoute;
