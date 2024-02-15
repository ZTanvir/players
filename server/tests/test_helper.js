const Player = require("../models/player");

const initilizePlayers = [
  {
    name: "Mohamed Salah",
    league: "epl",
    description:
      "Mohamed Salah Hamed Mahrous Ghaly, known as Mohamed Salah or Mo Salah, is an Egyptian professional footballer who plays as a right winger or forward for Premier League club Liverpool and captains the Egypt national team.",
  },
  {
    name: "Son Heung-min",
    league: "epl",
    description:
      "Son Heung-min is a South Korean professional footballer who plays as a forward for and captains both Premier League club Tottenham Hotspur and the South Korea national team. Often regarded as the greatest Asian footballer of all time, he is known for his speed, finishing, two-footedness, and ability to link play.",
  },
];

const nonExistingId = async () => {
  const player = new Player({
    name: "Declan Rice",
    league: "epl",
    description:
      "Declan Rice is an English professional footballer who plays as a defensive midfielder for Premier League club Arsenal and the England national team. Rice began his professional career at West Ham United, having been released by Chelsea's academy, and established himself as a key first-team player by 2017.",
  });

  await player.save();
  await Player.deleteOne({ name: "Declan Rice" });

  return player._id.toString();
};

const playersInDb = async () => {
  const players = await Player.find({});
  return players.map((player) => player.toJSON());
};

module.exports = {
  nonExistingId,
  initilizePlayers,
  playersInDb,
};
