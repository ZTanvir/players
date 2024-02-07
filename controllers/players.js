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

playerRoute.post("/", async (req, res) => {
  const { name, league, description } = req.body;

  if (name === undefined) {
    return res.status(400).json({ error: "Player name not found" });
  }
  if (league === undefined) {
    return res.status(400).json({ error: "Player league not found" });
  }
  if (description === undefined) {
    return res.status(400).json({ error: "Player description not found" });
  }
  const player = new Player({
    name,
    league,
    description,
    likes: 0,
    dislikes: 0,
  });
  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(404).json({ error: "Player not added" });
  }
});

module.exports = playerRoute;
