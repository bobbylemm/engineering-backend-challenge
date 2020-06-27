const chai = require("chai");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../../index");

describe("Index route", () => {
  it("should return a success message", () =>
    request(app)
      .get("/")
      .set("content-type", "application/json")
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          "Welcome to the drivers api home page"
        );
      }));
});

describe("add Driver details", () => {
  it("should fail if username is not provided", () =>
    request(app)
      .post("/api/v1/driver")
      .set("content-type", "application/json")
      .send({
        name: "dodo",
        age: 28,
        rating: 5,
      })
      .then((res) => {
        expect(res.status).to.equal(422);
        expect(res.body.errors).to.eql([
          { username: "must not be empty" },
          { username: "must be a string" },
          { username: "must be more than 3 words" },
          { vehicle: "must be a string" },
          { vehicle: "must be more than 3 words" },
          { vehicle: "must not be empty" },
        ]);
      }));

  it("add a new driver", () =>
    request(app)
      .post("/api/v1/driver")
      .set("content-type", "application/json")
      .send({
        username: "baleeqwqw",
        name: "mane",
        vehicle: "toyota",
        rating: 5,
      })

      .then((res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal("successfully created driver");
      }));

  it("should fail if username exists", () =>
    request(app)
      .post("/api/v1/driver")
      .set("content-type", "application/json")
      .send({
        username: "baleeqwqw",
        name: "mane",
        vehicle: "toyota",
        rating: 5,
      })

      .then((res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal(
          'This driver"s username already exists'
        );
      }));

  it("should return not found when driver does not exists", () =>
    request(app)
      .get('/api/v1/driver?username="jiwi"')
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("driver not found");
      }));
});
