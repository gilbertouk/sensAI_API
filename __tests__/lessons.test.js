const { app } = require("../app");
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
                title: "Art: Fine Art",
                body: "to  demonstrate the knowledge, skills and understanding through areas of study relevant to drawing.",
                teacher_id: 101,
                created_at: "2023-05-02T23:00:00.000Z",
                class_id: 2,
              },
              {
                id: 4,
                title: "Art: Art and Craft",
                body: "This title offers a broad-based course promoting diverse learning experiences in Art, Craft, and Design. It encompasses an extensive array of techniques, processes, and materials, including recyclable ones. The focus is on expanding the breadth of approach while maintaining the depth of learning. Students can explore personal interests across a wide course of study, incorporating practical, critical, and contextual sources. Flexibility in content and approach is key, with students required to engage in at least two of the listed titles: Fine Art, Graphic Communication, Textile Design, Three-dimensional Design, Photography, Critical and Contextual Studies",
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
