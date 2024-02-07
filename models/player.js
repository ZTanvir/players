const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("../utils/config");

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

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  league: { type: String, required: true },
  description: { type: String, required: true },
  likes: Number,
  dislikes: Number,
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
