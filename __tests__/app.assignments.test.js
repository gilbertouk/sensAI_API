const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/assignments/:teacher_id/:class_id", () => {
  test("200: Responds with array of assignment objects", () => {
    return request(app)
      .get("/api/assignments/101/1")
      .expect(200)
      .then(({ body }) => {
        const { assignments } = body;

        const expected = {
          id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
          teacher_id: expect.any(Number),
          created_at: expect.any(String),
          due_date: expect.any(String),
          class_id: expect.any(Number),
        };
        expect(assignments).toHaveLength(2);
        assignments.forEach((assignment) => {
          expect(assignment).toMatchObject(expected);
        });
      });
  });
  test("400: Returns Bad request when given invalid teacher_id", () => {
    return request(app)
      .get("/api/assignments/test/1")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toEqual("Bad request");
      });
  });
  test("400: Returns Bad request when given invalid class_id", () => {
    return request(app)
      .get("/api/assignments/101/test")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toEqual("Bad request");
      });
  });
  test("404: Returns Not found when given non-existent teacher_id", () => {
    return request(app)
      .get("/api/assignments/1000000/1")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toEqual("Not found");
      });
  });
  test("404: Returns Not found when given non-existent class_id", () => {
    return request(app)
      .get("/api/assignments/101/2000")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toEqual("Not found");
      });
  });
});

describe("GET /api/assignments/:teacher_id", () => {
  test("200: Returns status code 200", () => {
    return request(app).get("/api/assignments/101").expect(200);
  });
  test("200: Returns array of student assignment objects", () => {
    return request(app)
      .get("/api/assignments/101")
      .expect(200)
      .then(({ body }) => {
        const { assignments } = body;

        const expected = {
          id: expect.any(Number),
          assignment_id: expect.any(Number),
          user_id: expect.any(Number),
          work: expect.any(Object) || expect.any(String),
          submit_date: expect.any(Object) || expect.any(String),
          feedback: expect.any(Object) || expect.any(String),
          mark: expect.any(Object) || expect.any(String),
          class_id: expect.any(Number),
        };

        assignments.forEach((assignment) => {
          expect(assignment).toMatchObject(expected);
        });
      });
  });
  test("404: Returns Not found with non-existent teacher_id", () => {
    return request(app)
      .get("/api/assignments/10000")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toEqual("Not found");
      });
  });
  test("400: Returns Bad request with invalid teacher_id", () => {
    return request(app)
      .get("/api/assignments/test")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;

        expect(msg).toEqual("Bad request");
      });
  });
});

describe("PATCH /api/assignmentsid/:assignment_id", () => {
  test("200: Updates the assignment and responds with the updated assignment object", () => {
    return request(app)
      .patch("/api/assignmentsid/1")
      .send({ mark: "A", feedback: "Great work!" })
      .expect(200)
      .then(({ body }) => {
        const { assignment } = body;
        expect(assignment).toMatchObject({
          id: 1,
          assignment_id: 1,
          user_id: 1,
          work: null,
          submit_date: null,
          feedback: "Great work!",
          mark: "A",
        });
      });
  });

  test("400: Returns Bad request when given invalid assignment_id", () => {
    return request(app)
      .patch("/api/assignmentsid/test")
      .send({ mark: "A", feedback: "Well done!" })
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Bad request");
      });
  });

  test("404: Returns Not found when given non-existent assignment_id", () => {
    return request(app)
      .patch("/api/assignmentsid/10000")
      .send({ mark: "A", feedback: "Well done!" })
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toEqual("Not found");
      });
  });
});
