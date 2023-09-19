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
                title: expect.any(String),
                body: expect.any(String),
                teacher_id: expect.any(Number),
                created_at: expect.any(String),
                due_date: expect.any(String),
                class_id: expect.any(Number)
            }
            expect(assignments).toHaveLength(2);
            assignments.forEach(assignment => {
                expect(assignment).toMatchObject(expected);
            })
        })
    })
    test("400: Returns Bad request when given invalid teacher_id", ()=> {
        return request(app).get("/api/classes/test/1/assignments").expect(400).then(({body})=> {
            const {msg} = body;

            expect(msg).toEqual("Bad request");
        })
    })
    test("400: Returns Bad request when given invalid class_id", ()=> {
        return request(app).get("/api/classes/101/test/assignments").expect(400).then(({body})=> {
            const {msg} = body;

            expect(msg).toEqual("Bad request");
        })
    })
    test("404: Returns Not found when given non-existent teacher_id", ()=> {
        return request(app).get("/api/classes/1000000/1/assignments").expect(404).then(({body})=> {
            const {msg} = body;

            expect(msg).toEqual("Not found");
        })
    })
    test("404: Returns Not found when given non-existent class_id", ()=> {
        return request(app).get("/api/classes/101/2000/assignments").expect(404).then(({body})=> {
            const {msg} = body;

            expect(msg).toEqual("Not found");
        })
    })
})