const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("User endpoints", function() {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("clean the table", () => {
    db("saved_recipes").truncate();
    db("recipes").truncate();
    db("users").truncate();
  });
  afterEach("cleanup", () => {
    db("saved_recipes").truncate();
    db("recipes").truncate();
    db("users").truncate();
  });

  context("If there are no users in the database", () => {
    const testUsers = [
      {
        firstname: "Test User",
        lastname: "Number One",
        username: "testuser1",
        password: "testuser1password",
        profilepicture: "testuserpicture.url",
        profilebio: "Test User 1"
      },
      {
        firstname: "Test User",
        lastname: "Number Two",
        username: "testuser2",
        password: "testuser2password",
        profilepicture: "testuserpicture.url",
        profilebio: "Test User 2"
      },
      {
        firstname: "Test User",
        lastname: "Number Three",
        username: "testuser3",
        password: "testuser3password",
        profilepicture: "testuserpicture.url",
        profilebio: "Test User 3"
      }
    ];
    beforeEach("insert users", () => {
      return db.into("users").insert(testUsers);
    });

    it("GET /user responds with 200 and all of the users", () => {
      return supertest(app)
        .get("/api/user")
        .expect(200);
    });
  });
});
