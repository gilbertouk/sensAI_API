const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/lessons/:teacher_id/:class_id", () => {
  describe("controller: getLessonsByTeacherid", () => {
    test("Method GET: 200 status", () => {
      return request(app).get("/api/lessons/101/2").expect(200);
    });

    test("Method GET: should return 200 status with correct responds data", () => {
      return request(app)
        .get("/api/lessons/101/2")
        .then(({ body }) => {
          const expectLessons = {
            lessons: [
              {
                id: 3,
                title: "Art: Dali",
                body: "A exploration of surrealism and its implications for modernist art",
                teacher_id: 101,
                created_at: "2023-05-02T23:00:00.000Z",
                class_id: 2,
              },
              {
                id: 4,
                title: "Art: Michelangelo",
                body: "A consideration of how science, art, and math influence Michelangelo's creations",
                teacher_id: 101,
                created_at: "2019-04-02T23:00:00.000Z",
                class_id: 2,
              },
            ],
          };
          expect(body).toMatchObject(expectLessons);
        });
    });
  });
});
