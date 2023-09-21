const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("Delete /api/assignments/:assignment_id/:user_id", () => {
  test("204 Delete assignment by assignment_id and user_id", () => {
    return request(app).delete("/api/assignments/1/1").expect(204);
  });

  test("204 Delete assignment by assignment_id and user_id and check user assignments", () => {
    return request(app)
      .delete("/api/assignments/1/1")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM users_assignments;`).then(({ rows }) => {
          let isDeleted = true;
          rows.forEach((row) => {
            if (row.assignment_id === 1 && row.user_id === 1) {
              isDeleted = false;
            }
          });
          expect(isDeleted).toBe(true);
        });
      });
  });

  test("404 Delete when given assignment does not exist", () => {
    return request(app)
      .delete("/api/assignments/10000/1")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("404 Delete when given user_id does not exist", () => {
    return request(app)
      .delete("/api/assignments/1/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("400 Delete when given invalid assignment_id", () => {
    return request(app)
      .delete("/api/assignments/invalid/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("400 Delete when given invalid user_id", () => {
    return request(app)
      .delete("/api/assignments/1/invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});

describe("Delete /api/assignments/:assignment_id", () => {
  test("204 Delete assignment by assignment_id", () => {
    return request(app).delete("/api/assignments/1").expect(204);
  });

  test("204 Delete assignment by assignment_id and check assignments after", () => {
    return request(app)
      .delete("/api/assignments/1")
      .expect(204)
      .then(() => {
        return db.query(`SELECT * FROM assignments;`).then(({ rows }) => {
          let isDeleted = true;
          rows.forEach((row) => {
            if (row.id === 1) {
              isDeleted = false;
            }
          });
          expect(isDeleted).toBe(true);
        });
      });
  });

  test("404 Delete when given assignment does not exist", () => {
    return request(app)
      .delete("/api/assignments/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });

  test("400 Delete when given invalid assignment_id", () => {
    return request(app)
      .delete("/api/assignments/invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
