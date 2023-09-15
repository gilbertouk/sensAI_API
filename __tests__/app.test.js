const app = require('../app');
const request = require('supertest');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/');
const expectedEndpoints = require('../endpoints.json');

beforeEach(() => seed(data));
afterAll(() => db.end());

describe('returns 404 if route not found', () => {
  test('returns 404 if route not found ', () => {
    return request(app)
      .get('/bad_route')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('not found');
      });
  });
});
describe('GET /api/topics', () => {
  test('GET /api/topics returns list of topics length of 3', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3);
      });
  });
  test('GET /api/topics returns list of topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        const { topics } = response.body;
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});
describe('GET /api/articles', () => {
  test('returns array length of 13', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body.articles.length).toBe(13);
      });
  });
  test('return an array of article objects', () => {
    return request(app)
      .get('/api/articles')
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeInstanceOf(Array);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comments_count: expect.any(Number),
            })
          );
        });
      });
  });
  test('returns array sorted by created_at DESC', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy('created_at', { descending: true });
      });
  });
  test('returns array sorted by topic ASC', () => {
    return request(app)
      .get('/api/articles?sort_by=topic&order=ASC')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy('topic', { descending: false });
      });
  });
  test('returns array filter by topic: mitch', () => {
    return request(app)
      .get('/api/articles?topic=mitch')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) => expect(article.topic).toBe('mitch'));
      });
  });
  test('returns 200 if topic is valid but the is no articles about it', () => {
    return request(app)
      .get('/api/articles?topic=paper')
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles.length).toBe(0);
      });
  });
  test('returns objects doesnt have body property', () => {
    return request(app)
      .get('/api/articles')
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) =>
          expect(article).not.toHaveProperty('body')
        );
      });
  });
  test('returns error if not allowed topic passed', () => {
    return request(app)
      .get('/api/articles?topic=alpacas')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns error if sorted by non existing colum', () => {
    return request(app)
      .get('/api/articles?sort_by=alpacas')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('GET /api/articles/:article_id', () => {
  test('returns article object when passed id', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toHaveProperty('article_id', 1);
        expect(article).toHaveProperty(
          'title',
          'Living in the shadow of a great man'
        );
        expect(article).toHaveProperty('topic', 'mitch');
        expect(article).toHaveProperty('author', 'butter_bridge');
        expect(article).toHaveProperty(
          'body',
          'I find this existence challenging'
        );
        expect(article).toHaveProperty(
          'created_at',
          '2020-07-09T20:11:00.000Z'
        );
        expect(article).toHaveProperty('votes', 100);
        expect(article).toHaveProperty(
          'article_img_url',
          'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
        );
        expect(article).toHaveProperty('comments_count', 11);
      });
  });

  test('returns an error if article id has not been found', () => {
    return request(app)
      .get('/api/articles/9999999')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns an error if article id is not an integer', () => {
    return request(app)
      .get('/api/articles/BOOM')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('GET /api/articles/:article_id/comments', () => {
  test('returns array of 11 comments for  article_id 1', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(11);
      });
  });
  test('returns array of 0 comments for  article_id 2', () => {
    return request(app)
      .get('/api/articles/2/comments')
      .then((response) => {
        const { comments } = response.body;
        expect(comments.length).toBe(0);
      });
  });
  test('each comment object has required keys', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .then((response) => {
        const { comments } = response.body;
        comments.forEach((comment) =>
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              article_id: expect.any(Number),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          )
        );
      });
  });
  test('comments should be sorted by the most recent one', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toBeSortedBy('created_at', {
          descending: true,
        });
      });
  });
  test('returns an error if article id has not been found', () => {
    return request(app)
      .get('/api/articles/99999999/comments')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns an error if article id is not an int', () => {
    return request(app)
      .get('/api/articles/BOOM/comments')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('POST /api/articles/:article_id/comments', () => {
  test('returns a comment object with required keys and right values', () => {
    const body = {
      body: 'test',
      username: 'butter_bridge',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(200)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toEqual({
          comment_id: 19,
          body: 'test',
          article_id: 1,
          author: 'butter_bridge',
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });
  test('returns a comment object create_at string that is a date', () => {
    const body = {
      body: 'test',
      username: 'butter_bridge',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(200)
      .then((response) => {
        const { comment } = response.body;
        const date = new Date(comment.created_at);
        expect(date).toEqual(expect.any(Date));
      });
  });
  test('returns a an error if article_id doesnt exists', () => {
    const body = {
      body: 'testComment',
      username: 'butter_bridge',
    };
    return request(app)
      .post('/api/articles/99999999/comments')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns a an error if author doesnt exists', () => {
    const body = {
      body: 'testComment',
      username: 'Smooth_Operator',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns a an error if author hasnt been passed', () => {
    const body = {
      body: 'testComment',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns a an error if body hasnt been passed', () => {
    const body = {
      username: 'Smooth_Operator',
    };
    return request(app)
      .post('/api/articles/1/comments')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('PATCH /api/articles/:article_id', () => {
  test('returns updated article with incremented votes', () => {
    const body = {
      inc_votes: 1,
    };
    return request(app)
      .patch('/api/articles/1')
      .send(body)
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toEqual({
          article_id: 1,
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: '2020-07-09T20:11:00.000Z',
          votes: 101,
          article_img_url:
            'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        });
      });
  });
  test('returns updated article with decremented votes', () => {
    const body = {
      inc_votes: -101,
    };
    return request(app)
      .patch('/api/articles/1')
      .send(body)
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toEqual({
          article_id: 1,
          title: 'Living in the shadow of a great man',
          topic: 'mitch',
          author: 'butter_bridge',
          body: 'I find this existence challenging',
          created_at: '2020-07-09T20:11:00.000Z',
          votes: -1,
          article_img_url:
            'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
        });
      });
  });
  test('returns an error if article not found', () => {
    const body = {
      inc_votes: -101,
    };
    return request(app)
      .patch('/api/articles/999999')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns an error if body has not been passed', () => {
    const body = {
      // inc_votes: -101,
    };
    return request(app)
      .patch('/api/articles/1')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns an error if body isnt an int', () => {
    const body = {
      inc_votes: 'BOOM!',
    };
    return request(app)
      .patch('/api/articles/1')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('DELETE /api/comments/:comment_id', () => {
  test('DELETE /api/comments/1returns 204', () => {
    return request(app).delete('/api/comments/1').expect(204);
  });
  test('Returns error if the comment doesnt exist', () => {
    return request(app)
      .delete('/api/comments/9999999')
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('Returns error if the comment_id is not int', () => {
    return request(app)
      .delete('/api/comments/BOOM!')
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('GET /api/users', () => {
  test('returns array length of 4 user objects', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then((response) => {
        const { users } = response.body;
        expect(users.length).toBe(4);
      });
  });
  test('returns array of user objects with the right keys and properties', () => {
    return request(app)
      .get('/api/users')
      .then((response) => {
        const { users } = response.body;
        users.forEach((user) =>
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          )
        );
        expect(users.length).toBe(4);
      });
  });
});

describe('GET /api/users/:username', () => {
  test('returns a user object with the right values', () => {
    return request(app)
      .get('/api/users/icellusedkars')
      .expect(200)
      .then((response) => {
        const { user } = response.body;
        expect(user).toEqual({
          avatar_url:
            'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
          name: 'sam',
          username: 'icellusedkars',
        });
      });
  });
});
describe('GET /api/users/:username', () => {
  test('returns an error if user doesnt exists', () => {
    return request(app)
      .get('/api/users/MrBombastic')
      .expect(404)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe('Not found');
      });
  });
});
describe('PATCH /api/comments/:article_id', () => {
  test('returns updated comment with incremented votes', () => {
    const body = {
      inc_votes: 1,
    };
    return request(app)
      .patch('/api/comments/1')
      .send(body)
      .expect(200)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: 'butter_bridge',
          votes: 17,
          created_at: '2020-04-06T12:17:00.000Z',
        });
      });
  });
  test('returns updated comment with decremented votes', () => {
    const body = {
      inc_votes: -101,
    };
    return request(app)
      .patch('/api/comments/1')
      .send(body)
      .then((response) => {
        const { comment } = response.body;
        expect(comment).toEqual({
          comment_id: 1,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          article_id: 9,
          author: 'butter_bridge',
          votes: -85,
          created_at: '2020-04-06T12:17:00.000Z',
        });
      });
  });
  test('returns an error if comment not found', () => {
    const body = {
      inc_votes: -101,
    };
    return request(app)
      .patch('/api/comments/999999')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns an error if body has not been passed', () => {
    const body = {};
    return request(app)
      .patch('/api/comments/1')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns an error if body isnt an int', () => {
    const body = {
      inc_votes: 'BOOM!',
    };
    return request(app)
      .patch('/api/comments/1')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe.only('POST /api/articles', () => {
  test('returns an article object with required keys and right values', () => {
    const body = {
      author: 'butter_bridge',
      title: 'test',
      body: 'test',
      topic: 'cats',
      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles')
      .send(body)
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        article.created_at = new Date(article.created_at);
        expect(article).toEqual({
          article_id: 14,
          title: 'test',
          topic: 'cats',
          author: 'butter_bridge',
          body: 'test',
          created_at: expect.any(Date),
          votes: 0,
          article_img_url: 'test',
          comment_count: 0,
        });
      });
  });
  test('returns an article with default image url if article_img_url has not been passed', () => {
    const body = {
      author: 'butter_bridge',
      title: 'test',
      body: 'test',
      topic: 'cats',
    };
    return request(app)
      .post('/api/articles')
      .send(body)
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        article.created_at = new Date(article.created_at);
        expect(article).toEqual({
          article_id: 14,
          title: 'test',
          topic: 'cats',
          author: 'butter_bridge',
          body: 'test',
          created_at: expect.any(Date),
          votes: 0,
          article_img_url: 'default.url.uk',
          comment_count: 0,
        });
      });
  });

  test('returns a an error if topic doesnt exists', () => {
    const body = {
      author: 'butter_bridge',
      title: 'test',
      body: 'test',
      topic: 'alpacas',
      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles/')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns a an error if author doesnt exists', () => {
    const body = {
      author: 'MrBombastic',
      title: 'test',
      body: 'test',
      topic: 'cats',
      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles/')
      .send(body)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('Not found');
      });
  });
  test('returns a an error if author hasnt been passed', () => {
    const body = {
      title: 'test',
      body: 'test',
      topic: 'cats',
      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles/')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns a an error if body hasnt been passed', () => {
    const body = {
      author: 'butter_bridge',
      title: 'test',
      topic: 'cats',
      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles/')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns a an error if title hasnt been passed', () => {
    const body = {
      author: 'butter_bridge',
      topic: 'cats',
      body: 'test',

      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles/')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
  test('returns a an error if topic hasnt been passed', () => {
    const body = {
      author: 'butter_bridge',
      title: 'test',
      body: 'test',
      article_img_url: 'test',
    };
    return request(app)
      .post('/api/articles/')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('Bad request');
      });
  });
});
describe('GET /api', () => {
  test('GET /api returns endpoints desctiption object', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        expect(response.body.endpoints).toStrictEqual(expectedEndpoints);
      });
  });
});
