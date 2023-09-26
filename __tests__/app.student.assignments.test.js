const { app } = require("../app");
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

describe("Endpoint /api/student/:student_id/assignments/:assignment_id", () => {
  describe("controller: getStudentAssignmentByAssignmentId", () => {
    test("Method GET: 200 status", () => {
      return request(app).get("/api/student/3/assignments/1").expect(200);
    });

    test("Method GET: should return 200 status with correct responds data", () => {
      return request(app)
        .get("/api/student/3/assignments/1")
        .then(({ body }) => {
          const expectStudentAssignment = {
            assignment: [
              {
                id: 3,
                assignment_id: 1,
                user_id: 3,
                work: null,
                submit_date: null,
                feedback: null,
                mark: null,
                title: "English: Shakespeare assessment",
                body: "An assessment on Shakespeare, his plays and books",
                teacher_id: 101,
                created_at: "2021-11-11T00:00:00.000Z",
                due_date: "2021-10-10T23:00:00.000Z",
              },
            ],
          };
          expect(body).toMatchObject(expectStudentAssignment);
        });
    });

    test("Method GET: should return 404 status when given student_id does not exists", () => {
      return request(app)
        .get("/api/student/3000/assignments/1")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method GET: should return 404 status when given assignment_id does not exists", () => {
      return request(app)
        .get("/api/student/3/assignments/1000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method GET: should return 400 status when given invalid student_id", () => {
      return request(app)
        .get("/api/student/abc/assignments/1")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });

    test("Method GET: should return 400 status when given invalid assignment_id", () => {
      return request(app)
        .get("/api/student/3/assignments/abc")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });

  describe("controller: patchStudentAssignment", () => {
    test("Method PATCH: 200 status", () => {
      return request(app)
        .patch("/api/student/3/assignments/1")
        .send({ work: "test" })
        .expect(200);
    });

    test("Method PATCH: 200 status responds with the updated assignment", () => {
      return request(app)
        .patch("/api/student/3/assignments/1")
        .send({ work: "test" })
        .then(({ body }) => {
          const expectStudentAssignment = {
            assignment: {
              id: 3,
              assignment_id: 1,
              user_id: 3,
              work: "test",
              submit_date: body.assignment.submit_date,
              feedback: null,
              mark: null,
            },
          };
          expect(body).toMatchObject(expectStudentAssignment);
        });
    });

    test("Method PATCH: 200 status responds with the updated assignment and ignored  extra properties on the request body", () => {
      return request(app)
        .patch("/api/student/3/assignments/1")
        .send({ work: "test", test: true })
        .then(({ body }) => {
          const expectStudentAssignment = {
            assignment: {
              id: 3,
              assignment_id: 1,
              user_id: 3,
              work: "test",
              submit_date: body.assignment.submit_date,
              feedback: null,
              mark: null,
            },
          };
          expect(body).toMatchObject(expectStudentAssignment);
          expect(body.assignment).not.toHaveProperty("test");
        });
    });

    test("Method PATCH: 404 status when given student_id does not exist", () => {
      return request(app)
        .patch("/api/student/10000/assignments/1")
        .send({ work: "test" })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method PATCH: 404 status when given assignment_id does not exist", () => {
      return request(app)
        .patch("/api/student/3/assignments/10000")
        .send({ work: "test" })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });

    test("Method PATCH: 400 status when given invalid student_id", () => {
      return request(app)
        .patch("/api/student/abc/assignments/1")
        .send({ work: "test" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });

    test("Method PATCH: 400 status when given invalid assignment_id", () => {
      return request(app)
        .patch("/api/student/3/assignments/invalid")
        .send({ work: "test" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });

    test("Method PATCH: 400 status when given empty request body", () => {
      return request(app)
        .patch("/api/student/3/assignments/1")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});
