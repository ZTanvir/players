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
  const playerId = req.params.id;
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
    res.status(400).json({ error: "Player not added" });
  }
});

playerRoute.put("/:id", async (req, res) => {
  // update like and dislike
  const playerId = req.params.id;
  const { name, league, description, likes, dislikes } = req.body;
  const playerInfo = { name, league, description, likes, dislikes };

  try {
    console.log(playerId, playerInfo);
    const updatePlayer = await Player.findByIdAndUpdate(playerId, playerInfo, {
      new: true,
    });
    res.status(201).json(updatePlayer);
  } catch (error) {
    res.status(400).json({ error: "Player not updated" });
  }
});

module.exports = playerRoute;
