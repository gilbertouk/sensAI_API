const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/users", () => {
  test("get 200: when passed an array of user objects returns an array of objects which arent mutated and have same properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(Array.isArray(users)).toEqual(true);
        expect(users.length).toEqual(102);
        expect(users).toEqual(users);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              surname: expect.any(String),
              email: expect.any(String),
              role: expect.any(String),
              created_at: expect.any(String),
              role: expect.any(String || null),
            })
          );
        });
      });
  });

  test("get 200: when given an array of objects, returns the same values", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        expect(users[0].id).toEqual(1);
        expect(users[0].name).toEqual("User1");
        expect(users[0].surname).toEqual("Surname1");
        expect(users[0].email).toEqual("user1.surname1@example.com");
        expect(users[0].role).toEqual("student");
        expect(users[0].created_at).toEqual("2018-12-19T00:00:00.000Z");
        expect(users[0].disability).toEqual("ADHD");
        expect(users[101].id).toEqual(102);
        expect(users[101].name).toEqual("User102");
        expect(users[101].surname).toEqual("Surname102");
        expect(users[101].email).toEqual("user102.surname102@yahoo.com");
        expect(users[101].role).toEqual("teacher");
        expect(users[101].created_at).toEqual("2018-12-19T00:00:00.000Z");
        expect(users[101].disability).toEqual(null);
      });
  });
  test("status:404, responds with an error message when passed a invalid users path", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
describe("GET /api/users/email/:email", () => {
  test("should return 200", () => {
    return request(app)
      .get("/api/users/email/user1.surname1@example.com")
      .expect(200)
      .then((res) => {
        const { user } = res.body;
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
            role: expect.any(String),
            created_at: expect.any(String),
            disability: expect.any(String),
          })
        );
      });
  });
  test("should return 404 error if no record found", () => {
    return request(app)
      .get("/api/users/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("POST /api/users/email", () => {
  test("should return 201 and the inserted user", () => {
    return request(app)
      .post("/api/users/email")
      .send({ email: "new.user@example.com" })
      .expect(201)
      .then((res) => {
        const { user } = res.body;
        expect(user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: "new.user@example.com",
          })
        );
      });
  });

  test("should return 400 for invalid request", () => {
    return request(app)
      .post("/api/users/email")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
