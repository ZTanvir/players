const supertest = require("supertest");
const Player = require("../models/player");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const testHelper = require("../tests/test_helper");

describe("when there is some player saved", () => {
  beforeEach(async () => {
    await Player.deleteMany({});
    await Player.insertMany(testHelper.initilizePlayers);
  });
  test("player return as json", async () => {
    await api
      .get("/api/player")
      .expect(200)
      .expect("Content-type", /application\/json/);
  });
  test("All player return", async () => {
    const response = await api.get("/api/player");
    expect(response.body).toHaveLength(testHelper.initilizePlayers.length);
  });
  test("a specific player is within the return player", async () => {
    const response = await api.get("/api/player");
    const playersName = response.body.map((player) => player.name);
    expect(playersName).toContain("Mohamed Salah");
  });

  describe("view a specific player", () => {
    test("single player data return as json", async () => {
      const players = await testHelper.playersInDb();
      const singlePlayer = players[0];

      await api
        .get(`/api/player/${singlePlayer.id}`)
        .expect(200)
        .expect("Content-type", /application\/json/);
    });

    test("fail with status 404 when player not exist", async () => {
      const id = await testHelper.nonExistingId();

      await api.get(`/api/player/${id}`).expect(404);
    });

    test("fail with 400 when player id is malformatted", async () => {
      const sampleId = "abcd12345433fdsfdf";
      await api.get(`/api/player/${sampleId}`).expect(400);
    });
  });

  describe("addition of new player", () => {
    const validPlayer = {
      name: "Bukayo Saka",
      league: "epl",
      description:
        "Bukayo Ayoyinka Temidayo Saka is an English professional footballer who plays as a right winger for Premier League club Arsenal and the England national team.",
    };

    test("new player data return as json", async () => {
      await api
        .post(`/api/player`)
        .send(validPlayer)
        .expect(201)
        .expect("Content-type", /application\/json/);
    });

    test("successfully add a new player", async () => {
      const playersBeforeAddOne = await testHelper.playersInDb();
      await api.post(`/api/player`).send(validPlayer);
      const playersAfterAddOne = await testHelper.playersInDb();
      expect(playersAfterAddOne).toHaveLength(playersBeforeAddOne.length + 1);
    });

    test("added player name exist in database", async () => {
      await api.post(`/api/player`).send(validPlayer);
      const playerList = await testHelper.playersInDb();
      const playersName = playerList.map((player) => player.name);
      expect(playersName).toContain("Bukayo Saka");
    });
  });

  describe("deletion of a player", () => {
    test("reponse with status 204 if id is valid", async () => {
      const players = await testHelper.playersInDb();
      const playerId = players[0].id;

      await api.delete(`/api/player/${playerId}`).expect(204);
    });

    test("remove an existing player", async () => {
      const players = await testHelper.playersInDb();
      const playerId = players[0].id;

      await api.delete(`/api/player/${playerId}`);
      const playersAfterDelete = await testHelper.playersInDb();
      expect(playersAfterDelete).toHaveLength(players.length - 1);
    });

    test("removed player don't exist", async () => {
      const players = await testHelper.playersInDb();
      const playerId = players[0].id;
      const playerName = players[0].name;

      await api.delete(`/api/player/${playerId}`);
      const playersAfterDelete = await testHelper.playersInDb();
      const playersName = playersAfterDelete.map((player) => player.name);

      expect(playersName).not.toContain(playerName);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
