const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/classes/:teacher_id/:class_id/assignments", ()=> {
    test("200: Responds with array of assignment objects", ()=> {
        return request(app).get("/api/classes/101/1/assignments").expect(200).then(({body})=> {
            const {assignments} = body;
            
            const expected = {
                id: expect.any(Number),
                assignment_id: expect.any(Number),
                user_id: expect.any(Number),
                work: expect.any(String),
                submit_date: expect.any(String),
                feedback: expect.any(String),
                mark: expect.any(String)
            }

            assignments.forEach(assignment => {
                expect(assignment).toMatchObject(expected);
            })
        })
    })
})