const app = require("../src/app");

describe("App", () => {
  it(`GET /responds with 200 containing "Hello, world!`, () => {
    return supertest(app)
      .get("/")
      .expect(200, "Hello, world!");
  });
});

describe("/user endpoint", () => {
  it("returns an array of users", () => {
    return supertest(app)
      .get("/api/user")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(res => {
        expect(res.body).to.be.an("array");
      });
  });
});
