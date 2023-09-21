const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/classes/:teacher_id", () => {
  test("200 GET: when passed an teacher_id returns an array", () => {
    return request(app)
      .get("/api/classes/101")
      .expect(200)
      .then((res) => {
        let { classes } = res.body;

        expect(Array.isArray(classes)).toEqual(true);
        expect(classes.length).toBe(2);
      });
  });
  test("200 GET: when passed a teacher ID, returns objects with unmutated values", () => {
    const result = {
      id: 1,
      name: "green",
      age_group: "KS3",
      subject: "english",
      created_at: "2005-01-22T00:00:00.000Z",
      exam_board: "OCR",
    };
    return request(app)
      .get("/api/classes/101")
      .expect(200)
      .then((res) => {
        const { classes } = res.body;
        expect(classes[0]).toMatchObject(result);
      });
  });
  test("200 GET: when passed a teacher_id, responds with a classes array with objects with properties id, name, age_group, subject, created_at, exam_board", () => {
    return request(app)
      .get("/api/classes/101")
      .expect(200)
      .then((res) => {
        const { classes } = res.body;
        classes.forEach((individualClass) => {
          expect(individualClass).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            age_group: expect.any(String),
            subject: expect.any(String),
            created_at: expect.any(String),
            exam_board: expect.any(String),
          });
        });
      });
  });

  test("status:400, responds with an error message when passed a invalid input_id input", () => {
    return request(app)
      .get("/api/classes/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("status:404, responds with an error message when a valid input_ID which does not exist on the database", () => {
    return request(app)
      .get("/api/classes/900")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("GET /api/classes/:teacher_id/:class_id", () => {
  test("200: should return a list of students for valid class_id", () => {
    return request(app)
      .get("/api/classes/101/1")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.students)).toBe(true);
        expect(res.body.students.length).toBeGreaterThan(0);
        res.body.students.forEach((student) => {
          expect(student).toMatchObject({
            id: expect.any(Number),
            user_id: expect.any(Number),
            class_id: expect.any(Number),
            name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String),
            role: "student",
            created_at: expect.any(String),
          });
        });
      });
  });

  test("404: should return 'Not found' for non-existing class_id", () => {
    return request(app)
      .get("/api/classes/1/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("400: should return 'Bad request' for invalid class_id", () => {
    return request(app)
      .get("/api/classes/1/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
