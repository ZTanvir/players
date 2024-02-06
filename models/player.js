const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  league: { type: String, required: true },
  Description: { type: String, required: true },
  Likes: Number,
  Dislikes: Number,
});

playerSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
