const playerRoute = require("express").Router();
const Player = require("../models/player");

playerRoute.get("/", async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (error) {}
});

playerRoute.get("/:id", async (req, res, next) => {
  const playerId = req.params.id;
  try {
    if (playerId) {
      const player = await Player.findById(playerId);
      if (!player) {
        return res.status(404).end();
      }
      return res.status(200).json(player);
    }
  } catch (error) {
    next(error);
  }
});

playerRoute.post("/", async (req, res, next) => {
  const { name, league, description } = req.body;

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
    next(error);
  }
});

playerRoute.put("/:id", async (req, res, next) => {
  // update like and dislike
  const playerId = req.params.id;
  const { name, league, description, likes, dislikes } = req.body;
  const playerInfo = { name, league, description, likes, dislikes };

  try {
    const updatePlayer = await Player.findByIdAndUpdate(playerId, playerInfo, {
      new: true,
    });
    res.status(201).json(updatePlayer);
  } catch (error) {
    next(error);
  }
});

playerRoute.delete("/:id", async (req, res, next) => {
  const playerId = req.params.id;
  try {
    await Player.findByIdAndDelete(playerId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = playerRoute;
