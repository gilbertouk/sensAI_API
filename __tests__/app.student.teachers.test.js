const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Endpoint /api/student/teachers/:student_id", () => {
  describe("controller: getAllStudentTeachersByClassId", () => {
    test("Method GET: 200 status", () => {
      return request(app).get("/api/student/teachers/4").expect(200);
    });

    test("Method GET: should return 200 status with correct responds data", () => {
      return request(app)
        .get("/api/student/teachers/4")
        .then(({ body }) => {
          const expectTeachers = {
            teachers: [
              {
                id: 101,
                name: "User101",
                surname: "Surname101",
                email: "user101.surname101@yahoo.com",
                role: "teacher",
                created_at: "2003-11-07T00:00:00.000Z",
                disability: null,
              },
            ],
          };
          expect(body).toMatchObject(expectTeachers);
        });
    });

    test("Method GET: should return 404 when given a teacher's id instead of student_id ", () => {
      return request(app)
        .get("/api/student/teachers/101")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method GET: should return 404 status when given student_id does not exists", () => {
      return request(app)
        .get("/api/student/teachers/10000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method GET: should return 400 status when given invalid student_id", () => {
      return request(app)
        .get("/api/student/teachers/invalid")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});
