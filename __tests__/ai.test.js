const { app } = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("api testing", ()=> {
    test("201: Responds with ai response", ()=> {
        const body = {
            role: "user", 
            content: "What is 5x5 ?"
        }
        return request(app).post("/ai/assist").send(body).expect(201).then(({body})=> {
            const { message } = body;

            console.log(message);
        })
    })
})