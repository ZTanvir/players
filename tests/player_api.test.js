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
});

afterAll(async () => {
  await mongoose.connection.close();
});
