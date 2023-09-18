const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /lessons/:student_id", ()=>{
  test("200: Responds with the correct array of lesson objects", ()=> {
    return request(app).get("/api/lessons/1").expect(200).then(({body})=> {
      const {lessons} = body;
      
      const expected = {
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
        teacher_id: expect.any(Number),
        created_at: expect.any(String)
      }
    
      lessons.forEach(lesson => {
        expect(lesson).toMatchObject(expected);
      })

    })
  })
  test("400: Responds with bad request when given bad student_id", ()=>{
    return request(app).get("/api/lessons/test").expect(400).then(({body}) =>{
      const {msg} = body;
      
      expect(msg).toEqual("Bad request");
    })
  })
  test("404: Responds with not found when given bad student_id", ()=> {
    return request(app).get("/api/lessons/1000000").expect(404).then(({body}) => {
      const {msg} = body;

      expect(msg).toEqual("Not found");
    })
  })
})