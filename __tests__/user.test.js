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

describe("controller: patchUser", () => {
  test("Method PATCH: 200 status responds with the updated user", () => {
    const user_id = 2;
    const updatedData = {
          name: "User2",
          surname: "NewSurname",
          email: "user2.surname2@yahoo.com",
          disability: "Dyscalculia",
    }; // Update surname
    return request(app)
      .patch(`/api/users/${user_id}`)
      .send(updatedData)
      .then(({ body }) => {
        const expectedUser = {
          id: user_id,
          name: "User2", // Keep the name the same
          surname: "NewSurname", // Updated surname
          email: "user2.surname2@yahoo.com", // Keep the email the same
          role: "student", // Keep the role the same
          disability: "Dyscalculia", // Keep the disability the same
        };
        expect(body).toMatchObject(expectedUser);
      });
  });

  test("Method PATCH: 404 status when given user ID does not exist", () => {
    const user_id = 10000; // Non-existent user ID
    const updatedData = { name: "NewName" }; // Update name
    return request(app)
      .patch(`/api/user/${user_id}`)
      .send(updatedData)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("Method PATCH: 404 status when given invalid user ID", () => {
    const user_id = "abc"; // Invalid user ID
    const updatedData = { name: "NewName" }; // Update name
    return request(app)
      .patch(`/api/user/${user_id}`)
      .send(updatedData)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("Method PATCH: 404 status when given empty request body", () => {
    const user_id = 1;
    const updatedData = {}; // Empty request body
    return request(app)
      .patch(`/api/user/${user_id}`)
      .send(updatedData)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});