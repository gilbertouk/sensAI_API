const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("POST /api/users/newuser", () => {
  test("201: Returns status code 201", () => {
    const body = {
      name: "mr",
      surname: "bean",
      email: "mr@bean.com",
      role: "student",
      disability: "ADHD",
    };
    return request(app).post("/api/users/newuser").send(body).expect(201);
  });
  test("201: Returns user object", () => {
    const body = {
      name: "mr",
      surname: "bean",
      email: "mr@bean.com",
      disability: "ADHD",
    };
    return request(app)
      .post("/api/users/newuser")
      .send(body)
      .expect(201)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toEqual(
          expect.objectContaining({
            name: "mr",
            surname: "bean",
            email: "mr@bean.com",
            disability: "ADHD",
          })
        );
      });
  });
});
