const { app } = require("../app");
const request = require("supertest");
const endpoints = require("../endpoints.json");

describe("Endpoint /api", () => {
  describe("Method GET", () => {
    test("GET: 200 status", () => {
      return request(app).get("/api").expect(200);
    });

    test("GET: 200 responds with an object describing all the available endpoints on your API", () => {
      return request(app)
        .get("/api")
        .then(({ body }) => {
          const apiEndpoints = body.endpoints;

          expect(apiEndpoints.constructor === Object).toBe(true);
          expect(apiEndpoints).toEqual(endpoints);
        });
    });
  });
});
