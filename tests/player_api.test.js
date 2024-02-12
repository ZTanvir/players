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

describe("view a specific player", () => {
  test("single player data return as json", async () => {
    const players = await testHelper.playersInDb();
    const singlePlayer = players[0];

    api
      .get(`/api/player/${singlePlayer.id}`)
      .expect(200)
      .expect("Content-type", /application\/json/);
  });

  test("fail with status 404 when player not exist", async () => {
    const id = await testHelper.nonExistingId();

    api.get(`/api/player/${id}`).expect(404);
  });

  test("fail with 400 when player id is invalid", async () => {
    const sampleId = "abcd12345433fdsfdf";

    api.get(`api/player/${sampleId}`).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
