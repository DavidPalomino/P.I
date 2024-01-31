/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  // Colocar Valores id img etc
  name: "Super Mario Bros",
  description: "ADSFA",
  platforms: "Furry Rolplay",
  imagen: "Blow your mind => Jhon F. Kennedy",
  releaseDate: 11,
  rating: 4.2,
  genres: "Caterpilar Retroexcabadora con traccion de orguga 340F, garra hidraulica"
};

describe('Videogames routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(async () => {
    await Videogame.create(videogame)
  });

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );
  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });
});
})