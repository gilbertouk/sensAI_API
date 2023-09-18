const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Endpoint /api/student/:student_id/assignments", () => {
  describe("controller: getStudentAssignments", () => {
    test("Method GET: 200 status", () => {
      return request(app).get("/api/student/3/assignments").expect(200);
    });

    test("Method GET: should return 200 status with correct responds data", () => {
      return request(app)
        .get("/api/student/3/assignments")
        .then(({ body }) => {
          const expectAssignments = {
            assignments: [
              {
                id: 3,
                title: "English: Shakespeare assessment",
                body: "An assessment on Shakespeare, his plays and books",
                teacher_id: 101,
                created_at: "2021-11-11T00:00:00.000Z",
                due_date: "2021-10-10T23:00:00.000Z",
                assignment_id: 1,
                user_id: 3,
                work: null,
                submit_date: null,
                feedback: null,
                mark: null,
              },
              {
                id: 28,
                title: "English: Dickens assessment",
                body: "An assessment on Dickens Christmas stories",
                teacher_id: 101,
                created_at: "2022-08-31T23:00:00.000Z",
                due_date: "2022-10-10T23:00:00.000Z",
                assignment_id: 2,
                user_id: 3,
                work: null,
                submit_date: null,
                feedback: null,
                mark: null,
              },
            ],
          };
          expect(body).toMatchObject(expectAssignments);
        });
    });

    test("Method GET: should return 404 status when given student_id does not exists", () => {
      return request(app)
        .get("/api/student/3000/assignments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method GET: should return 400 status when given invalid student_id", () => {
      return request(app)
        .get("/api/student/abc/assignments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});
